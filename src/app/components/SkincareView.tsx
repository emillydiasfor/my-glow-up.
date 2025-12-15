"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Plus, CheckCircle2, Clock, Camera, X } from "lucide-react";

interface SkincareViewProps {
  addPoints: (points: number) => void;
}

interface SkincareRoutine {
  id: string;
  type: "morning" | "night";
  products: string[];
  completed: boolean;
  timestamp: string;
  photoUrl?: string;
  aiAnalysis?: string;
}

export function SkincareView({ addPoints }: SkincareViewProps) {
  const [routines, setRoutines] = useState<SkincareRoutine[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [selectedType, setSelectedType] = useState<"morning" | "night">("morning");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("glowup_skincare");
    if (saved) {
      setRoutines(JSON.parse(saved));
    }
  }, []);

  const saveRoutines = (newRoutines: SkincareRoutine[]) => {
    setRoutines(newRoutines);
    localStorage.setItem("glowup_skincare", JSON.stringify(newRoutines));
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

  const analyzeSkinPhoto = async () => {
    if (!photoPreview) return;

    setIsAnalyzing(true);
    
    // Simular análise de IA (em produção, usar API real)
    setTimeout(() => {
      const analyses = [
        "Pele hidratada detectada! Continue usando hidratante diariamente para manter a saúde da pele.",
        "Recomendação: Adicione um sérum com vitamina C pela manhã para proteção antioxidante.",
        "Sua rotina está ótima! Lembre-se de usar protetor solar mesmo em dias nublados.",
        "Detectamos sinais de ressecamento. Considere aumentar a hidratação e beber mais água.",
        "Cabelo saudável! Continue com a rotina de hidratação semanal para manter o brilho.",
        "Dica: Use produtos com ácido hialurônico para aumentar a hidratação da pele.",
        "Pele com boa textura! Recomendamos esfoliação suave 2x por semana para manter o glow.",
        "Detectamos oleosidade na zona T. Use produtos oil-free e matificantes nessa região.",
        "Ótima luminosidade! Seus produtos estão funcionando bem. Continue com a rotina.",
        "Cabelo com frizz detectado. Experimente leave-in com óleo de argan para controle.",
      ];
      
      const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
      setAiAnalysis(randomAnalysis);
      setIsAnalyzing(false);
      
      // Bonus de pontos por usar IA
      addPoints(10);
    }, 2000);
  };

  const addProduct = () => {
    if (!newProduct.trim() && !photoPreview) return;

    const today = new Date().toDateString();
    const existingRoutine = routines.find(r => r.type === selectedType && new Date(r.timestamp).toDateString() === today);

    if (existingRoutine) {
      const updated = routines.map(r =>
        r.id === existingRoutine.id
          ? { 
              ...r, 
              products: newProduct.trim() ? [...r.products, newProduct] : r.products,
              photoUrl: photoPreview || r.photoUrl,
              aiAnalysis: aiAnalysis || r.aiAnalysis,
            }
          : r
      );
      saveRoutines(updated);
    } else {
      const newRoutine: SkincareRoutine = {
        id: Date.now().toString(),
        type: selectedType,
        products: newProduct.trim() ? [newProduct] : [],
        completed: false,
        timestamp: new Date().toISOString(),
        photoUrl: photoPreview || undefined,
        aiAnalysis: aiAnalysis || undefined,
      };
      saveRoutines([...routines, newRoutine]);
    }

    setNewProduct("");
    setPhotoPreview(null);
    setAiAnalysis("");
    setShowAddProduct(false);
  };

  const completeRoutine = (id: string) => {
    const updated = routines.map(r =>
      r.id === id ? { ...r, completed: true } : r
    );
    saveRoutines(updated);
    addPoints(15);

    // Atualizar stats do dia
    const today = new Date().toDateString();
    const statsKey = `glowup_stats_${today}`;
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{"meals":0,"workouts":0,"skincare":0,"water":0}');
    stats.skincare += 1;
    localStorage.setItem(statsKey, JSON.stringify(stats));
  };

  const todayRoutines = routines.filter(r => {
    const routineDate = new Date(r.timestamp).toDateString();
    const today = new Date().toDateString();
    return routineDate === today;
  });

  const morningRoutine = todayRoutines.find(r => r.type === "morning");
  const nightRoutine = todayRoutines.find(r => r.type === "night");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Rotina de Cuidados</h2>
        </div>
        <p className="text-pink-100">Mantenha sua pele e cabelo saudáveis com análise de IA</p>
      </div>

      {/* Routine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Morning Routine */}
        <RoutineCard
          title="Rotina Matinal"
          icon="☀️"
          routine={morningRoutine}
          onComplete={() => morningRoutine && completeRoutine(morningRoutine.id)}
          onAdd={() => {
            setSelectedType("morning");
            setShowAddProduct(true);
          }}
          color="from-yellow-400 to-orange-500"
        />

        {/* Night Routine */}
        <RoutineCard
          title="Rotina Noturna"
          icon="🌙"
          routine={nightRoutine}
          onComplete={() => nightRoutine && completeRoutine(nightRoutine.id)}
          onAdd={() => {
            setSelectedType("night");
            setShowAddProduct(true);
          }}
          color="from-indigo-500 to-purple-600"
        />
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Adicionar à Rotina - {selectedType === "morning" ? "Manhã" : "Noite"}
            </h3>

            <div className="space-y-4">
              {/* Photo Capture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Foto da Pele/Cabelo (Opcional)
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
                      className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-pink-500 transition-colors"
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
                    onClick={analyzeSkinPhoto}
                    disabled={isAnalyzing}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analisando com IA...
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
                  Produto (Opcional)
                </label>
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="Ex: Protetor solar FPS 50"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === "Enter" && addProduct()}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddProduct(false);
                  setPhotoPreview(null);
                  setAiAnalysis("");
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addProduct}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Dicas de Skincare
        </h3>
        <ul className="space-y-3">
          <TipItem text="Sempre use protetor solar, mesmo em dias nublados" />
          <TipItem text="Hidrate sua pele após a limpeza" />
          <TipItem text="Remova a maquiagem antes de dormir" />
          <TipItem text="Beba pelo menos 2L de água por dia" />
          <TipItem text="Use a IA para analisar sua pele e receber recomendações personalizadas" />
        </ul>
      </div>
    </div>
  );
}

function RoutineCard({
  title,
  icon,
  routine,
  onComplete,
  onAdd,
  color,
}: {
  title: string;
  icon: string;
  routine?: SkincareRoutine;
  onComplete: () => void;
  onAdd: () => void;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${color} p-3 rounded-xl text-2xl`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        {routine?.completed && (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        )}
      </div>

      {routine?.photoUrl && (
        <img
          src={routine.photoUrl}
          alt="Rotina"
          className="w-full h-32 object-cover rounded-xl mb-3"
        />
      )}

      {routine?.aiAnalysis && (
        <div className="mb-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-purple-700 dark:text-purple-300">
              {routine.aiAnalysis}
            </p>
          </div>
        </div>
      )}

      {routine && routine.products.length > 0 ? (
        <div className="space-y-3 mb-4">
          {routine.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
              <span className="text-sm text-gray-900 dark:text-white">{product}</span>
            </div>
          ))}
        </div>
      ) : routine && !routine.products.length && routine.photoUrl ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Foto adicionada - análise da IA disponível
        </p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Nenhum produto adicionado ainda
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={onAdd}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </button>
        {routine && !routine.completed && (routine.products.length > 0 || routine.photoUrl) && (
          <button
            onClick={onComplete}
            className={`flex-1 px-4 py-3 rounded-xl bg-gradient-to-r ${color} text-white font-medium hover:opacity-90 transition-opacity`}
          >
            Completar
          </button>
        )}
      </div>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
      <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
    </li>
  );
}
