'use server';

import { supabase } from '@/lib/supabase';
import { Meal } from '@/lib/supabase-types';

export async function getMeals(userId: string): Promise<Meal[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTodayMeals(userId: string): Promise<Meal[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createMeal(
  userId: string,
  meal: Omit<Meal, 'id' | 'user_id' | 'created_at'>
): Promise<Meal> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('meals')
    .insert([{ ...meal, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMeal(mealId: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabase
    .from('meals')
    .delete()
    .eq('id', mealId);

  if (error) throw error;
}
