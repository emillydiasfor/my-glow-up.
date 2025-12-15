// Tipos para o banco de dados Supabase

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  points: number;
  level: number;
  created_at: string;
  updated_at: string;
};

export type SkincareRoutine = {
  id: string;
  user_id: string;
  type: 'morning' | 'night';
  products: string[];
  completed: boolean;
  photo_url?: string;
  ai_analysis?: string;
  created_at: string;
  updated_at: string;
};

export type Meal = {
  id: string;
  user_id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: string[];
  calories: number;
  photo?: string;
  ai_analyzed: boolean;
  created_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  type: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  calories_burned: number;
  photo_url?: string;
  ai_analysis?: string;
  created_at: string;
};

export type Mission = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  points: number;
  type: 'daily' | 'weekly' | 'achievement';
  completed: boolean;
  icon?: string;
  requirement: number;
  progress: number;
  created_at: string;
  updated_at: string;
};

export type DailyRoutine = {
  id: string;
  user_id: string;
  time: string;
  title: string;
  description?: string;
  completed: boolean;
  category: 'morning' | 'afternoon' | 'evening' | 'night';
  created_at: string;
  updated_at: string;
};

export type DailyStats = {
  id: string;
  user_id: string;
  date: string;
  meals: number;
  workouts: number;
  skincare: number;
  water: number;
  created_at: string;
  updated_at: string;
};
