"use client";

import { useState, useEffect } from "react";
import { Sparkles, Trophy, Target, Heart, Utensils, Dumbbell, User, Moon, Sun, Calendar, LogOut } from "lucide-react";
import { DashboardView } from "./components/DashboardView";
import { SkincareView } from "./components/SkincareView";
import { MealsView } from "./components/MealsView";
import { WorkoutsView } from "./components/WorkoutsView";
import { ProfileView } from "./components/ProfileView";
import { MissionsView } from "./components/MissionsView";
import { RoutineView } from "./components/RoutineView";
import { AuthModal } from "./components/AuthModal";
import { supabase } from "@/lib/supabase";

export default function GlowUpApp() {
  const [activeView, setActiveView] = useState<"dashboard" | "skincare" | "meals" | "workouts" | "profile" | "missions" | "routine">("dashboard");
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão do usuário
    checkUser();

    // Listener para mudanças na autenticação (apenas se Supabase estiver configurado)
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser(session.user);
            loadUserData(session.user.id);
          } else {
            setUser(null);
            setShowAuthModal(true);
          }
        }
      );

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  }, []);

  const checkUser = async () => {
    try {
      if (!supabase) {
        // Se Supabase não estiver configurado, carregar dados locais
        loadLocalData();
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user.id);
      } else {
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      loadLocalData();
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    if (!supabase) {
      loadLocalData();
      return;
    }

    try {
      // Carregar dados do usuário do Supabase
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // Usuário não existe, criar perfil
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (currentUser) {
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: userId,
                email: currentUser?.email,
                points: 0,
                level: 1,
              }
            ])
            .select()
            .single();

          if (createError) {
            console.error("Erro ao criar perfil:", createError);
            // Fallback para localStorage
            loadLocalData();
          } else if (newProfile) {
            setUserPoints(newProfile.points);
            setUserLevel(newProfile.level);
          }
        }
      } else if (data) {
        setUserPoints(data.points);
        setUserLevel(data.level);
      } else {
        // Fallback para localStorage
        loadLocalData();
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      loadLocalData();
    }

    // Carregar tema
    const savedTheme = localStorage.getItem("glowup_theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  };

  const loadLocalData = () => {
    const savedPoints = localStorage.getItem("glowup_points");
    const savedLevel = localStorage.getItem("glowup_level");
    
    if (savedPoints) setUserPoints(parseInt(savedPoints));
    if (savedLevel) setUserLevel(parseInt(savedLevel));
  };

  useEffect(() => {
    // Salvar pontos no localStorage
    localStorage.setItem("glowup_points", userPoints.toString());
    const newLevel = Math.floor(userPoints / 100) + 1;
    setUserLevel(newLevel);
    localStorage.setItem("glowup_level", newLevel.toString());

    // Salvar no Supabase se estiver configurado e usuário logado
    if (user && supabase) {
      const savePoints = async () => {
        try {
          await supabase
            .from('user_profiles')
            .update({ points: userPoints, level: newLevel })
            .eq('id', user.id);
        } catch (error) {
          console.error("Erro ao salvar pontos:", error);
        }
      };

      savePoints();
    }
  }, [userPoints, user]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("glowup_theme", newDarkMode ? "dark" : "light");
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const addPoints = (points: number) => {
    setUserPoints(prev => prev + points);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setUserPoints(0);
    setUserLevel(1);
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-xl inline-block mb-4 animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-colors duration-300">
      {supabase && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {}}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}

      {(user || !supabase) && (
        <>
          {/* Header */}
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-pink-200 dark:border-purple-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Glow Up
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user?.user_metadata?.full_name || user?.email || "Modo Local"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    aria-label="Alternar modo noturno"
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Moon className="w-5 h-5 text-purple-600" />
                    )}
                  </button>

                  <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-4 py-2 rounded-full">
                    <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <div className="text-sm">
                      <span className="font-bold text-gray-900 dark:text-white">Nível {userLevel}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">{userPoints} pts</span>
                    </div>
                  </div>

                  {user && supabase && (
                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      aria-label="Sair"
                    >
                      <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
            {activeView === "dashboard" && <DashboardView addPoints={addPoints} userPoints={userPoints} userLevel={userLevel} />}
            {activeView === "skincare" && <SkincareView addPoints={addPoints} />}
            {activeView === "meals" && <MealsView addPoints={addPoints} />}
            {activeView === "workouts" && <WorkoutsView addPoints={addPoints} />}
            {activeView === "profile" && <ProfileView />}
            {activeView === "missions" && <MissionsView addPoints={addPoints} userPoints={userPoints} />}
            {activeView === "routine" && <RoutineView addPoints={addPoints} />}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-pink-200 dark:border-purple-800 z-50">
            <div className="max-w-7xl mx-auto px-2">
              <div className="flex items-center justify-around py-2">
                <NavButton
                  icon={<Target className="w-5 h-5" />}
                  label="Início"
                  active={activeView === "dashboard"}
                  onClick={() => setActiveView("dashboard")}
                />
                <NavButton
                  icon={<Calendar className="w-5 h-5" />}
                  label="Rotina"
                  active={activeView === "routine"}
                  onClick={() => setActiveView("routine")}
                />
                <NavButton
                  icon={<Heart className="w-5 h-5" />}
                  label="Cuidados"
                  active={activeView === "skincare"}
                  onClick={() => setActiveView("skincare")}
                />
                <NavButton
                  icon={<Utensils className="w-5 h-5" />}
                  label="Refeições"
                  active={activeView === "meals"}
                  onClick={() => setActiveView("meals")}
                />
                <NavButton
                  icon={<Dumbbell className="w-5 h-5" />}
                  label="Treinos"
                  active={activeView === "workouts"}
                  onClick={() => setActiveView("workouts")}
                />
                <NavButton
                  icon={<Trophy className="w-5 h-5" />}
                  label="Missões"
                  active={activeView === "missions"}
                  onClick={() => setActiveView("missions")}
                />
                <NavButton
                  icon={<User className="w-5 h-5" />}
                  label="Perfil"
                  active={activeView === "profile"}
                  onClick={() => setActiveView("profile")}
                />
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
        active
          ? "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30"
          : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
