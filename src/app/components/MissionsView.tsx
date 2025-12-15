"use client";

import { useState, useEffect } from "react";
import { Trophy, Target, CheckCircle2, Lock, Sparkles } from "lucide-react";

interface MissionsViewProps {
  addPoints: (points: number) => void;
  userPoints: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  type: "daily" | "weekly" | "achievement";
  completed: boolean;
  icon: string;
  requirement: number;
  progress: number;
}

export function MissionsView({ addPoints, userPoints }: MissionsViewProps) {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedMissions = localStorage.getItem(`glowup_missions_${today}`);
    
    if (savedMissions) {
      setMissions(JSON.parse(savedMissions));
    } else {
      // Criar missões diárias
      const dailyMissions: Mission[] = [
        {
          id: "daily_1",
          title: "Registre 3 Refeições",
          description: "Complete seu diário alimentar de hoje",
          points: 30,
          type: "daily",
          completed: false,
          icon: "🍽️",
          requirement: 3,
          progress: 0,
        },
        {
          id: "daily_2",
          title: "Complete 1 Treino",
          description: "Faça pelo menos um exercício hoje",
          points: 40,
          type: "daily",
          completed: false,
          icon: "💪",
          requirement: 1,
          progress: 0,
        },
        {
          id: "daily_3",
          title: "Rotina de Skincare",
          description: "Complete sua rotina matinal e noturna",
          points: 25,
          type: "daily",
          completed: false,
          icon: "✨",
          requirement: 2,
          progress: 0,
        },
        {
          id: "daily_4",
          title: "Beba 2L de Água",
          description: "Mantenha-se hidratado durante o dia",
          points: 20,
          type: "daily",
          completed: false,
          icon: "💧",
          requirement: 2,
          progress: 0,
        },
      ];
      
      setMissions(dailyMissions);
      localStorage.setItem(`glowup_missions_${today}`, JSON.stringify(dailyMissions));
    }
  }, []);

  useEffect(() => {
    // Atualizar progresso das missões baseado nas stats
    const today = new Date().toDateString();
    const stats = JSON.parse(localStorage.getItem(`glowup_stats_${today}`) || '{"meals":0,"workouts":0,"skincare":0,"water":0}');
    
    const updatedMissions = missions.map(mission => {
      let progress = mission.progress;
      
      if (mission.id === "daily_1") progress = stats.meals;
      if (mission.id === "daily_2") progress = stats.workouts;
      if (mission.id === "daily_3") progress = stats.skincare;
      if (mission.id === "daily_4") progress = stats.water;
      
      const completed = progress >= mission.requirement;
      
      return { ...mission, progress, completed };
    });
    
    setMissions(updatedMissions);
    localStorage.setItem(`glowup_missions_${today}`, JSON.stringify(updatedMissions));
  }, [userPoints]); // Atualiza quando pontos mudam (indica atividade)

  const completeMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    addPoints(mission.points);
    
    const updatedMissions = missions.map(m =>
      m.id === missionId ? { ...m, completed: true } : m
    );
    
    setMissions(updatedMissions);
    const today = new Date().toDateString();
    localStorage.setItem(`glowup_missions_${today}`, JSON.stringify(updatedMissions));
  };

  const dailyMissions = missions.filter(m => m.type === "daily");
  const completedCount = dailyMissions.filter(m => m.completed).length;
  const totalPoints = dailyMissions.reduce((sum, m) => sum + (m.completed ? m.points : 0), 0);

  const achievements = [
    { id: "ach_1", title: "Primeira Semana", description: "Complete 7 dias consecutivos", icon: "🔥", locked: userPoints < 100 },
    { id: "ach_2", title: "Mestre do Skincare", description: "Complete 30 rotinas de skincare", icon: "✨", locked: userPoints < 200 },
    { id: "ach_3", title: "Fitness Warrior", description: "Complete 50 treinos", icon: "💪", locked: userPoints < 300 },
    { id: "ach_4", title: "Nutrição Expert", description: "Registre 100 refeições", icon: "🍽️", locked: userPoints < 400 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Missões</h2>
        </div>
        <p className="text-yellow-100 mb-4">Complete desafios e ganhe recompensas</p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-100 mb-1">Missões Completas</p>
              <p className="text-3xl font-bold">{completedCount}/{dailyMissions.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-yellow-100 mb-1">Pontos Ganhos</p>
              <p className="text-3xl font-bold">{totalPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Missions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          Missões Diárias
        </h3>
        <div className="space-y-3">
          {dailyMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onComplete={completeMission}
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Conquistas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionCard({ mission, onComplete }: { mission: Mission; onComplete: (id: string) => void }) {
  const progress = Math.min((mission.progress / mission.requirement) * 100, 100);
  const canComplete = mission.progress >= mission.requirement && !mission.completed;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{mission.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{mission.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{mission.description}</p>
            </div>
            {mission.completed && (
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
            )}
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progresso</span>
              <span>{mission.progress}/{mission.requirement}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                +{mission.points} pontos
              </span>
            </div>
            {canComplete && (
              <button
                onClick={() => onComplete(mission.id)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-medium hover:from-yellow-600 hover:to-orange-700 transition-all"
              >
                Resgatar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: { id: string; title: string; description: string; icon: string; locked: boolean } }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 ${
      achievement.locked ? "opacity-60" : ""
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`text-3xl ${achievement.locked ? "grayscale" : ""}`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h4>
            {achievement.locked && <Lock className="w-4 h-4 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
        </div>
      </div>
      {achievement.locked && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          Continue progredindo para desbloquear
        </div>
      )}
    </div>
  );
}
