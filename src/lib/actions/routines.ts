'use server';

import { supabase } from '@/lib/supabase';
import { DailyRoutine } from '@/lib/supabase-types';

export async function getDailyRoutines(userId: string): Promise<DailyRoutine[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('daily_routines')
    .select('*')
    .eq('user_id', userId)
    .order('time', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createDailyRoutine(
  userId: string,
  routine: Omit<DailyRoutine, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<DailyRoutine> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('daily_routines')
    .insert([{ ...routine, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDailyRoutine(
  routineId: string,
  updates: Partial<DailyRoutine>
): Promise<DailyRoutine> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('daily_routines')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', routineId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleRoutineCompletion(routineId: string, completed: boolean): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabase
    .from('daily_routines')
    .update({ completed, updated_at: new Date().toISOString() })
    .eq('id', routineId);

  if (error) throw error;
}

export async function deleteDailyRoutine(routineId: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabase
    .from('daily_routines')
    .delete()
    .eq('id', routineId);

  if (error) throw error;
}

export async function createDefaultRoutines(userId: string): Promise<DailyRoutine[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const defaultRoutines = [
    {
      user_id: userId,
      time: '07:00',
      title: 'Rotina Matinal',
      description: 'Acordar, beber água e alongar',
      completed: false,
      category: 'morning' as const,
    },
    {
      user_id: userId,
      time: '08:00',
      title: 'Café da Manhã',
      description: 'Refeição saudável e balanceada',
      completed: false,
      category: 'morning' as const,
    },
    {
      user_id: userId,
      time: '12:00',
      title: 'Almoço',
      description: 'Refeição principal do dia',
      completed: false,
      category: 'afternoon' as const,
    },
    {
      user_id: userId,
      time: '18:00',
      title: 'Treino',
      description: 'Exercícios físicos',
      completed: false,
      category: 'evening' as const,
    },
    {
      user_id: userId,
      time: '22:00',
      title: 'Skincare Noturno',
      description: 'Cuidados com a pele antes de dormir',
      completed: false,
      category: 'night' as const,
    },
  ];

  const { data, error } = await supabase
    .from('daily_routines')
    .insert(defaultRoutines)
    .select();

  if (error) throw error;
  return data || [];
}
