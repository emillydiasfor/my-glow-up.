'use server';

import { supabase } from '@/lib/supabase';
import { Workout } from '@/lib/supabase-types';

export async function getWorkouts(userId: string): Promise<Workout[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTodayWorkouts(userId: string): Promise<Workout[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createWorkout(
  userId: string,
  workout: Omit<Workout, 'id' | 'user_id' | 'created_at'>
): Promise<Workout> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('workouts')
    .insert([{ ...workout, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteWorkout(workoutId: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', workoutId);

  if (error) throw error;
}
