"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Flame, Droplet, Moon, CheckCircle2 } from "lucide-react";

interface DashboardViewProps {
  addPoints: (points: number) => void;
  userPoints: number;
  userLevel: number;
}

export function DashboardView({ addPoints, userPoints, userLevel }: DashboardViewProps) {
  const [todayStats, setTodayStats] = useState({
    meals: 0,
    workouts: 0,
    skincare: 0,
    water: 0,
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const savedStats = localStorage.getItem(`glowup_stats_${today}`);
    if (savedStats) {
      setTodayStats(JSON.parse(savedStats));
    }
  }, []);

  const progressToNextLevel = ((userPoints % 100) / 100) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Olá, Glower! ✨</h2>
        <p className="text-pink-100 mb-4">Continue sua jornada de transformação hoje</p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Nível {userLevel}</span>
            <span className="text-sm font-medium">Nível {userLevel + 1}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-xs text-pink-100 mt-2 text-center">
            {100 - (userPoints % 100)} pontos para o próximo nível
          </p>
        </div>
      </div>

      {/* Today's Progress */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Progresso de Hoje</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            icon={<Flame className="w-6 h-6" />}
            label="Refeições"
            value={todayStats.meals}
            target={3}
            color="from-orange-400 to-red-500"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Treinos"
            value={todayStats.workouts}
            target={1}
            color="from-blue-400 to-cyan-500"
          />
          <StatCard
            icon={<Droplet className="w-6 h-6" />}
            label="Skincare"
            value={todayStats.skincare}
            target={2}
            color="from-pink-400 to-purple-500"
          />
          <StatCard
            icon={<Moon className="w-6 h-6" />}
            label="Água (L)"
            value={todayStats.water}
            target={2}
            color="from-cyan-400 to-blue-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            title="Registrar Refeição"
            description="Adicione sua última refeição"
            icon="🍽️"
            color="from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30"
          />
          <QuickActionCard
            title="Completar Treino"
            description="Marque seu treino de hoje"
            icon="💪"
            color="from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30"
          />
          <QuickActionCard
            title="Rotina de Skincare"
            description="Registre seus cuidados"
            icon="✨"
            color="from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30"
          />
          <QuickActionCard
            title="Ver Missões"
            description="Complete desafios diários"
            icon="🎯"
            color="from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30"
          />
        </div>
      </div>

      {/* Streak */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Sequência Atual</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Continue assim para ganhar bônus!</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              7
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">dias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, target, color }: { icon: React.ReactNode; label: string; value: number; target: number; color: string }) {
  const percentage = Math.min((value / target) * 100, 100);
  const isComplete = value >= target;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`bg-gradient-to-br ${color} p-2 rounded-lg text-white`}>
            {icon}
          </div>
          {isComplete && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}<span className="text-sm text-gray-500">/{target}</span>
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
          <div
            className={`bg-gradient-to-r ${color} h-full rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, icon, color }: { title: string; description: string; icon: string; color: string }) {
  return (
    <button className={`bg-gradient-to-br ${color} rounded-xl p-5 text-left hover:scale-105 transition-transform shadow-lg border border-gray-200 dark:border-gray-700`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </button>
  );
}
