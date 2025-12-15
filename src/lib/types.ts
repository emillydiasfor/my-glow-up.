// Tipos do banco de dados Supabase

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
  title: string;
  description?: string;
  time_of_day: 'morning' | 'night';
  products: string[];
  completed: boolean;
  completed_at?: string;
  created_at: string;
};

export type Meal = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  image_url?: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  duration_minutes: number;
  exercises: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  completed_at?: string;
  created_at: string;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  points_reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'skincare' | 'meals' | 'workouts' | 'general';
  icon: string;
  created_at: string;
};

export type UserMission = {
  id: string;
  user_id: string;
  mission_id: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
  mission?: Mission;
};

export type DailyRoutine = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  time: string;
  days_of_week: number[]; // 0-6 (domingo a sábado)
  category: 'skincare' | 'meals' | 'workouts' | 'general';
  icon: string;
  created_at: string;
};

export type UserRoutineCompletion = {
  id: string;
  user_id: string;
  routine_id: string;
  completed_at: string;
  routine?: DailyRoutine;
};
