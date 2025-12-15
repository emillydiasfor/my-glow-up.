"use client";

import { useState, useEffect, useRef } from "react";
import { Dumbbell, Plus, Trash2, Clock, Flame, Camera, Sparkles, X } from "lucide-react";

interface WorkoutsViewProps {
  addPoints: (points: number) => void;
}

interface Workout {
  id: string;
  type: string;
  duration: number;
  intensity: "low" | "medium" | "high";
  caloriesBurned: number;
  timestamp: string;
  photoUrl?: string;
  aiAnalysis?: string;
}

export function WorkoutsView({ addPoints }: WorkoutsViewProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState<Workout["intensity"]>("medium");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("glowup_workouts");
    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }, []);

  const saveWorkouts = (newWorkouts: Workout[]) => {
    setWorkouts(newWorkouts);
    localStorage.setItem("glowup_workouts", JSON.stringify(newWorkouts));
  };

  const calculateCalories = (duration: number, intensity: Workout["intensity"]) => {
    const baseCalories = duration * 5;
    const multiplier = intensity === "low" ? 0.7 : intensity === "medium" ? 1 : 1.5;
    return Math.round(baseCalories * multiplier);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWorkoutPhoto = async () => {
    if (!photoPreview) return;

    setIsAnalyzing(true);
    
    // Simular análise de IA (em produção, usar API real)
    setTimeout(() => {
      const analyses = [
        "Postura correta detectada! Continue mantendo as costas retas durante o exercício.",
        "Ótima forma! Seus músculos estão bem ativados. Recomendo aumentar a intensidade gradualmente.",
        "Exercício identificado: Agachamento. Calorias estimadas: 150-200 por 30 minutos.",
        "Treino de força detectado! Lembre-se de descansar 48h entre treinos do mesmo grupo muscular.",
        "Cardio intenso identificado! Mantenha a hidratação e monitore sua frequência cardíaca.",
      ];
      
      const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
      setAiAnalysis(randomAnalysis);
      setIsAnalyzing(false);
      
      // Bonus de pontos por usar IA
      addPoints(10);
    }, 2000);
  };

  const addWorkout = () => {
    if (!workoutType.trim()) return;

    const caloriesBurned = calculateCalories(duration, intensity);
    const newWorkout: Workout = {
      id: Date.now().toString(),
      type: workoutType,
      duration,
      intensity,
      caloriesBurned,
      timestamp: new Date().toISOString(),
      photoUrl: photoPreview || undefined,
      aiAnalysis: aiAnalysis || undefined,
    };

    saveWorkouts([newWorkout, ...workouts]);
    addPoints(20);

    // Atualizar stats do dia
    const today = new Date().toDateString();
    const statsKey = `glowup_stats_${today}`;
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{"meals":0,"workouts":0,"skincare":0,"water":0}');
    stats.workouts += 1;
    localStorage.setItem(statsKey, JSON.stringify(stats));

    setWorkoutType("");
    setDuration(30);
    setIntensity("medium");
    setPhotoPreview(null);
    setAiAnalysis("");
    setShowAddWorkout(false);
  };

  const deleteWorkout = (id: string) => {
    saveWorkouts(workouts.filter(w => w.id !== id));
  };

  const todayWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.timestamp).toDateString();
    const today = new Date().toDateString();
    return workoutDate === today;
  });

  const totalCaloriesBurned = todayWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
  const totalDuration = todayWorkouts.reduce((sum, w) => sum + w.duration, 0);

  const workoutSuggestions = [
    "Corrida",
    "Musculação",
    "Yoga",
    "Pilates",
    "Natação",
    "Ciclismo",
    "Caminhada",
    "HIIT",
    "Dança",
    "Funcional",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Dumbbell className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Treinos</h2>
        </div>
        <p className="text-blue-100 mb-4">Registre seus exercícios e acompanhe seu progresso</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-blue-100 mb-1">Calorias Queimadas</p>
            <p className="text-3xl font-bold">{totalCaloriesBurned}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-blue-100 mb-1">Tempo Total</p>
            <p className="text-3xl font-bold">{totalDuration}<span className="text-lg">min</span></p>
          </div>
        </div>
      </div>

      {/* Add Workout Button */}
      <button
        onClick={() => setShowAddWorkout(true)}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-medium hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Adicionar Treino
      </button>

      {/* Today's Workouts */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Treinos de Hoje</h3>
        {todayWorkouts.length > 0 ? (
          <div className="space-y-4">
            {todayWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} onDelete={deleteWorkout} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Nenhum treino registrado hoje</p>
          </div>
        )}
      </div>

      {/* Add Workout Modal */}
      {showAddWorkout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Adicionar Treino
            </h3>

            <div className="space-y-4">
              {/* Photo Capture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Foto do Treino (Opcional)
                </label>
                <div className="relative">
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => {
                          setPhotoPreview(null);
                          setAiAnalysis("");
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors"
                    >
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Tirar ou escolher foto
                      </span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoCapture}
                    className="hidden"
                  />
                </div>

                {photoPreview && !aiAnalysis && (
                  <button
                    onClick={analyzeWorkoutPhoto}
                    disabled={isAnalyzing}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Analisar com IA
                      </>
                    )}
                  </button>
                )}

                {aiAnalysis && (
                  <div className="mt-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-1">
                          Análise da IA
                        </p>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          {aiAnalysis}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Treino
                </label>
                <input
                  type="text"
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  placeholder="Ex: Corrida"
                  list="workout-suggestions"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <datalist id="workout-suggestions">
                  {workoutSuggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Intensidade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setIntensity("low")}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      intensity === "low"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Leve
                  </button>
                  <button
                    onClick={() => setIntensity("medium")}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      intensity === "medium"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Média
                  </button>
                  <button
                    onClick={() => setIntensity("high")}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      intensity === "high"
                        ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Alta
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Calorias estimadas: <span className="font-bold text-blue-600 dark:text-blue-400">
                    {calculateCalories(duration, intensity)} kcal
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddWorkout(false);
                  setPhotoPreview(null);
                  setAiAnalysis("");
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addWorkout}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-medium hover:from-blue-600 hover:to-cyan-700 transition-all"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutCard({ workout, onDelete }: { workout: Workout; onDelete: (id: string) => void }) {
  const intensityColors = {
    low: "from-green-500 to-emerald-600",
    medium: "from-yellow-500 to-orange-600",
    high: "from-red-500 to-pink-600",
  };

  const intensityLabels = {
    low: "Leve",
    medium: "Média",
    high: "Alta",
  };

  const time = new Date(workout.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
      {workout.photoUrl && (
        <img
          src={workout.photoUrl}
          alt="Treino"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}

      {workout.aiAnalysis && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-purple-700 dark:text-purple-300">
              {workout.aiAnalysis}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${intensityColors[workout.intensity]} p-3 rounded-xl`}>
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{workout.type}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              {time}
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(workout.id)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mx-auto mb-1" />
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duração</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.duration}min</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Calorias</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.caloriesBurned}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${intensityColors[workout.intensity]} mx-auto mb-1`} />
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Intensidade</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{intensityLabels[workout.intensity]}</p>
        </div>
      </div>
    </div>
  );
}
