'use server';

import { supabase } from '@/lib/supabase';
import { DailyStats } from '@/lib/supabase-types';

export async function getDailyStats(userId: string, date: string): Promise<DailyStats | null> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function getTodayStats(userId: string): Promise<DailyStats> {
  const today = new Date().toISOString().split('T')[0];
  const stats = await getDailyStats(userId, today);

  if (stats) {
    return stats;
  }

  // Criar stats do dia se não existir
  return createDailyStats(userId, today);
}

export async function createDailyStats(userId: string, date: string): Promise<DailyStats> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('daily_stats')
    .insert([
      {
        user_id: userId,
        date,
        meals: 0,
        workouts: 0,
        skincare: 0,
        water: 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDailyStats(
  userId: string,
  date: string,
  updates: Partial<Omit<DailyStats, 'id' | 'user_id' | 'date' | 'created_at' | 'updated_at'>>
): Promise<DailyStats> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  // Verificar se stats existe
  const existing = await getDailyStats(userId, date);

  if (!existing) {
    // Criar novo
    return createDailyStats(userId, date);
  }

  // Atualizar existente
  const { data, error } = await supabase
    .from('daily_stats')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('date', date)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function incrementStat(
  userId: string,
  statType: 'meals' | 'workouts' | 'skincare' | 'water'
): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const today = new Date().toISOString().split('T')[0];
  const stats = await getTodayStats(userId);

  const newValue = (stats[statType] || 0) + 1;

  await updateDailyStats(userId, today, { [statType]: newValue });
}
