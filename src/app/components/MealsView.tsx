"use client";

import { useState, useEffect, useRef } from "react";
import { Utensils, Camera, Plus, Trash2, Clock, Sparkles, Loader2 } from "lucide-react";

interface MealsViewProps {
  addPoints: (points: number) => void;
}

interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  items: string[];
  calories: number;
  timestamp: string;
  photo?: string;
  aiAnalyzed?: boolean;
}

export function MealsView({ addPoints }: MealsViewProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedType, setSelectedType] = useState<Meal["type"]>("breakfast");
  const [mealItems, setMealItems] = useState("");
  const [estimatedCalories, setEstimatedCalories] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("glowup_meals");
    if (saved) {
      setMeals(JSON.parse(saved));
    }
  }, []);

  const saveMeals = (newMeals: Meal[]) => {
    setMeals(newMeals);
    localStorage.setItem("glowup_meals", JSON.stringify(newMeals));
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      analyzePhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzePhoto = async (photoBase64: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simular análise de IA (em produção, usar API real como OpenAI Vision)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Análise simulada - em produção, usar API real
      const mockAnalysis = {
        items: ["Arroz", "Feijão", "Frango grelhado", "Salada verde", "Batata"],
        calories: 650,
      };

      setMealItems(mockAnalysis.items.join(", "));
      setEstimatedCalories(mockAnalysis.calories);
      
      // Adicionar pontos bônus por usar IA
      addPoints(5);
    } catch (error) {
      console.error("Erro ao analisar foto:", error);
      alert("Erro ao analisar a foto. Por favor, tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addMeal = () => {
    if (!mealItems.trim()) return;

    const items = mealItems.split(",").map(item => item.trim()).filter(Boolean);
    const newMeal: Meal = {
      id: Date.now().toString(),
      type: selectedType,
      items,
      calories: estimatedCalories,
      timestamp: new Date().toISOString(),
      photo: photoPreview || undefined,
      aiAnalyzed: photoPreview ? true : false,
    };

    saveMeals([newMeal, ...meals]);
    addPoints(photoPreview ? 15 : 10); // Bônus por usar foto

    // Atualizar stats do dia
    const today = new Date().toDateString();
    const statsKey = `glowup_stats_${today}`;
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{"meals":0,"workouts":0,"skincare":0,"water":0}');
    stats.meals += 1;
    localStorage.setItem(statsKey, JSON.stringify(stats));

    setMealItems("");
    setEstimatedCalories(0);
    setPhotoPreview(null);
    setShowAddMeal(false);
  };

  const deleteMeal = (id: string) => {
    saveMeals(meals.filter(m => m.id !== id));
  };

  const todayMeals = meals.filter(m => {
    const mealDate = new Date(m.timestamp).toDateString();
    const today = new Date().toDateString();
    return mealDate === today;
  });

  const totalCaloriesToday = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);

  const mealTypeLabels = {
    breakfast: "Café da Manhã",
    lunch: "Almoço",
    dinner: "Jantar",
    snack: "Lanche",
  };

  const mealTypeEmojis = {
    breakfast: "🌅",
    lunch: "🍽️",
    dinner: "🌙",
    snack: "🍎",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Utensils className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Refeições</h2>
        </div>
        <p className="text-orange-100 mb-4">Registre suas refeições e acompanhe sua nutrição</p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-100 mb-1">Calorias Hoje</p>
              <p className="text-3xl font-bold">{totalCaloriesToday}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100 mb-1">Refeições</p>
              <p className="text-3xl font-bold">{todayMeals.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Feature Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <div>
            <h3 className="font-bold">IA para Análise de Refeições</h3>
            <p className="text-sm text-purple-100">Tire uma foto e receba estimativa automática de calorias!</p>
          </div>
        </div>
      </div>

      {/* Add Meal Button */}
      <button
        onClick={() => setShowAddMeal(true)}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium hover:from-orange-600 hover:to-red-700 transition-all shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Adicionar Refeição
      </button>

      {/* Today's Meals */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Refeições de Hoje</h3>
        {todayMeals.length > 0 ? (
          <div className="space-y-4">
            {todayMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Nenhuma refeição registrada hoje</p>
          </div>
        )}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Adicionar Refeição
            </h3>

            <div className="space-y-4">
              {/* Photo Capture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Foto da Refeição (Opcional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="text-center text-white">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                          <p className="text-sm font-medium">Analisando com IA...</p>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setPhotoPreview(null);
                        setMealItems("");
                        setEstimatedCalories(0);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
                  >
                    <Camera className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Tirar ou escolher foto
                    </span>
                  </button>
                )}
                
                {photoPreview && !isAnalyzing && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Análise concluída! +5 pontos bônus</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Refeição
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["breakfast", "lunch", "dinner", "snack"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
                        selectedType === type
                          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {mealTypeEmojis[type]} {mealTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Itens (separados por vírgula)
                </label>
                <textarea
                  value={mealItems}
                  onChange={(e) => setMealItems(e.target.value)}
                  placeholder="Ex: Arroz integral, Frango grelhado, Salada"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={3}
                  disabled={isAnalyzing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Calorias Estimadas
                </label>
                <input
                  type="number"
                  value={estimatedCalories || ""}
                  onChange={(e) => setEstimatedCalories(parseInt(e.target.value) || 0)}
                  placeholder="Ex: 500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddMeal(false);
                  setPhotoPreview(null);
                  setMealItems("");
                  setEstimatedCalories(0);
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={isAnalyzing}
              >
                Cancelar
              </button>
              <button
                onClick={addMeal}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAnalyzing || !mealItems.trim()}
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

function MealCard({ meal, onDelete }: { meal: Meal; onDelete: (id: string) => void }) {
  const mealTypeLabels = {
    breakfast: "Café da Manhã",
    lunch: "Almoço",
    dinner: "Jantar",
    snack: "Lanche",
  };

  const mealTypeEmojis = {
    breakfast: "🌅",
    lunch: "🍽️",
    dinner: "🌙",
    snack: "🍎",
  };

  const time = new Date(meal.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
      {meal.photo && (
        <div className="relative mb-4">
          <img
            src={meal.photo}
            alt="Foto da refeição"
            className="w-full h-48 object-cover rounded-xl"
          />
          {meal.aiAnalyzed && (
            <div className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Analisado por IA
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{mealTypeEmojis[meal.type]}</div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{mealTypeLabels[meal.type]}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              {time}
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(meal.id)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        {meal.items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            {item}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Calorias</span>
        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{meal.calories} kcal</span>
      </div>
    </div>
  );
}
