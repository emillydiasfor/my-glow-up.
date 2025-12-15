"use client";

import { useState, useEffect } from "react";
import { User, Edit2, Save, TrendingUp, Calendar, Award, Crown, Sparkles } from "lucide-react";
import { SubscriptionModal } from "./SubscriptionModal";

interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  goal: string;
  skinType: string;
  hairType: string;
  subscription: "free" | "premium";
  subscriptionDate?: string;
}

export function ProfileView() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: 0,
    height: 0,
    weight: 0,
    goal: "",
    skinType: "",
    hairType: "",
    subscription: "free",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [measurements, setMeasurements] = useState<Array<{ date: string; weight: number }>>([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("glowup_profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const savedMeasurements = localStorage.getItem("glowup_measurements");
    if (savedMeasurements) {
      setMeasurements(JSON.parse(savedMeasurements));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("glowup_profile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleSubscribe = (plan: "free" | "premium") => {
    const updatedProfile = {
      ...profile,
      subscription: plan,
      subscriptionDate: plan === "premium" ? new Date().toISOString() : undefined,
    };
    setProfile(updatedProfile);
    localStorage.setItem("glowup_profile", JSON.stringify(updatedProfile));
    setShowSubscriptionModal(false);
  };

  const addMeasurement = () => {
    if (profile.weight > 0) {
      const newMeasurement = {
        date: new Date().toISOString(),
        weight: profile.weight,
      };
      const updated = [newMeasurement, ...measurements].slice(0, 10);
      setMeasurements(updated);
      localStorage.setItem("glowup_measurements", JSON.stringify(updated));
    }
  };

  const calculateBMI = () => {
    if (profile.height > 0 && profile.weight > 0) {
      const heightInMeters = profile.height / 100;
      return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "0";
  };

  const getBMICategory = (bmi: string) => {
    const value = parseFloat(bmi);
    if (value < 18.5) return { label: "Abaixo do peso", color: "text-blue-600" };
    if (value < 25) return { label: "Peso normal", color: "text-green-600" };
    if (value < 30) return { label: "Sobrepeso", color: "text-yellow-600" };
    return { label: "Obesidade", color: "text-red-600" };
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  const skinTypes = ["Normal", "Seca", "Oleosa", "Mista", "Sensível"];
  const hairTypes = ["Liso", "Ondulado", "Cacheado", "Crespo"];
  const goals = [
    "Perder peso",
    "Ganhar massa muscular",
    "Manter peso",
    "Melhorar saúde",
    "Cuidados com a pele",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Meu Perfil</h2>
          {profile.subscription === "premium" && (
            <div className="ml-auto flex items-center gap-2 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
              <Crown className="w-4 h-4" />
              PREMIUM
            </div>
          )}
        </div>
        <p className="text-purple-100">Acompanhe sua evolução e personalize sua experiência</p>
      </div>

      {/* Subscription Card */}
      <div className={`rounded-2xl p-6 shadow-lg border-2 ${
        profile.subscription === "premium"
          ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-500"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {profile.subscription === "premium" ? (
              <>
                <Crown className="w-5 h-5 text-purple-600" />
                Assinatura Premium
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-gray-600" />
                Plano Gratuito
              </>
            )}
          </h3>
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              profile.subscription === "premium"
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {profile.subscription === "premium" ? "Gerenciar" : "Assinar Premium"}
          </button>
        </div>

        {profile.subscription === "premium" ? (
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              ✨ Você tem acesso ilimitado a todas as funcionalidades premium!
            </p>
            {profile.subscriptionDate && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Membro desde {new Date(profile.subscriptionDate).toLocaleDateString("pt-BR")}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Valor</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">R$ 19,90/mês</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-lg font-bold text-green-600">Ativo</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              Desbloqueie recursos exclusivos com o plano Premium:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Crown className="w-4 h-4 text-purple-600" />
                Rotinas ilimitadas e personalizadas
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Análise avançada com IA
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Award className="w-4 h-4 text-purple-600" />
                Conteúdo exclusivo e suporte prioritário
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações Pessoais</h3>
          <button
            onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Salvar
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Editar
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nome"
            value={profile.name}
            onChange={(value) => setProfile({ ...profile, name: value })}
            disabled={!isEditing}
            placeholder="Seu nome"
          />
          <InputField
            label="Idade"
            type="number"
            value={profile.age || ""}
            onChange={(value) => setProfile({ ...profile, age: parseInt(value) || 0 })}
            disabled={!isEditing}
            placeholder="Sua idade"
          />
          <InputField
            label="Altura (cm)"
            type="number"
            value={profile.height || ""}
            onChange={(value) => setProfile({ ...profile, height: parseInt(value) || 0 })}
            disabled={!isEditing}
            placeholder="Ex: 170"
          />
          <InputField
            label="Peso (kg)"
            type="number"
            value={profile.weight || ""}
            onChange={(value) => setProfile({ ...profile, weight: parseFloat(value) || 0 })}
            disabled={!isEditing}
            placeholder="Ex: 70"
          />
          <SelectField
            label="Tipo de Pele"
            value={profile.skinType}
            onChange={(value) => setProfile({ ...profile, skinType: value })}
            disabled={!isEditing}
            options={skinTypes}
          />
          <SelectField
            label="Tipo de Cabelo"
            value={profile.hairType}
            onChange={(value) => setProfile({ ...profile, hairType: value })}
            disabled={!isEditing}
            options={hairTypes}
          />
          <SelectField
            label="Objetivo Principal"
            value={profile.goal}
            onChange={(value) => setProfile({ ...profile, goal: value })}
            disabled={!isEditing}
            options={goals}
            fullWidth
          />
        </div>
      </div>

      {/* BMI Card */}
      {profile.height > 0 && profile.weight > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Índice de Massa Corporal (IMC)
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{bmi}</p>
              <p className={`text-lg font-medium ${bmiCategory.color}`}>{bmiCategory.label}</p>
            </div>
            <button
              onClick={addMeasurement}
              className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm font-medium"
            >
              Registrar Medida
            </button>
          </div>
        </div>
      )}

      {/* Measurements History */}
      {measurements.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Histórico de Medidas
          </h3>
          <div className="space-y-3">
            {measurements.map((measurement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(measurement.date).toLocaleDateString("pt-BR")}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {measurement.weight} kg
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          Resumo de Atividades
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox label="Refeições" value={getTotalCount("meals")} icon="🍽️" />
          <StatBox label="Treinos" value={getTotalCount("workouts")} icon="💪" />
          <StatBox label="Skincare" value={getTotalCount("skincare")} icon="✨" />
          <StatBox label="Dias Ativos" value="7" icon="🔥" />
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        currentPlan={profile.subscription}
      />
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  disabled,
  options,
  fullWidth = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  options: string[];
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}

function getTotalCount(type: string): number {
  let total = 0;
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith("glowup_stats_")) {
      const stats = JSON.parse(localStorage.getItem(key) || "{}");
      total += stats[type] || 0;
    }
  });
  
  return total;
}
