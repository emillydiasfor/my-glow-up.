'use server';

import { supabase } from '@/lib/supabase';
import { SkincareRoutine } from '@/lib/supabase-types';

export async function getSkincareRoutines(userId: string): Promise<SkincareRoutine[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('skincare_routines')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTodaySkincareRoutines(userId: string): Promise<SkincareRoutine[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('skincare_routines')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createSkincareRoutine(
  userId: string,
  routine: Omit<SkincareRoutine, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<SkincareRoutine> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('skincare_routines')
    .insert([{ ...routine, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSkincareRoutine(
  routineId: string,
  updates: Partial<SkincareRoutine>
): Promise<SkincareRoutine> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('skincare_routines')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', routineId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeSkincareRoutine(routineId: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabase
    .from('skincare_routines')
    .update({ completed: true, updated_at: new Date().toISOString() })
    .eq('id', routineId);

  if (error) throw error;
}
