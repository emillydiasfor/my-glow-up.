// Tipos gerados automaticamente para o Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          points: number
          level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          points?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          points?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
      }
      skincare_routines: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          time_of_day: 'morning' | 'night'
          products: string[]
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          time_of_day: 'morning' | 'night'
          products?: string[]
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          time_of_day?: 'morning' | 'night'
          products?: string[]
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          calories: number | null
          protein: number | null
          carbs: number | null
          fats: number | null
          image_url: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          calories?: number | null
          protein?: number | null
          carbs?: number | null
          fats?: number | null
          image_url?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          calories?: number | null
          protein?: number | null
          carbs?: number | null
          fats?: number | null
          image_url?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          duration_minutes: number
          exercises: string[]
          difficulty: 'easy' | 'medium' | 'hard'
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          duration_minutes: number
          exercises?: string[]
          difficulty: 'easy' | 'medium' | 'hard'
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          duration_minutes?: number
          exercises?: string[]
          difficulty?: 'easy' | 'medium' | 'hard'
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      missions: {
        Row: {
          id: string
          title: string
          description: string
          points_reward: number
          difficulty: 'easy' | 'medium' | 'hard'
          category: 'skincare' | 'meals' | 'workouts' | 'general'
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          points_reward?: number
          difficulty: 'easy' | 'medium' | 'hard'
          category: 'skincare' | 'meals' | 'workouts' | 'general'
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          points_reward?: number
          difficulty?: 'easy' | 'medium' | 'hard'
          category?: 'skincare' | 'meals' | 'workouts' | 'general'
          icon?: string
          created_at?: string
        }
      }
      user_missions: {
        Row: {
          id: string
          user_id: string
          mission_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mission_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mission_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      daily_routines: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          time: string
          days_of_week: number[]
          category: 'skincare' | 'meals' | 'workouts' | 'general'
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          time: string
          days_of_week?: number[]
          category: 'skincare' | 'meals' | 'workouts' | 'general'
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          time?: string
          days_of_week?: number[]
          category?: 'skincare' | 'meals' | 'workouts' | 'general'
          icon?: string
          created_at?: string
        }
      }
      user_routine_completions: {
        Row: {
          id: string
          user_id: string
          routine_id: string
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          routine_id: string
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          routine_id?: string
          completed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
