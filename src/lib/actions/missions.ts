'use server';

import { supabase } from '@/lib/supabase';
import { Mission } from '@/lib/supabase-types';

export async function getMissions(userId: string, type?: 'daily' | 'weekly' | 'achievement'): Promise<Mission[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  let query = supabase
    .from('missions')
    .select('*')
    .eq('user_id', userId);

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTodayMissions(userId: string): Promise<Mission[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .eq('user_id', userId)
    .eq('type', 'daily')
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createMission(
  userId: string,
  mission: Omit<Mission, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<Mission> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('missions')
    .insert([{ ...mission, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMission(
  missionId: string,
  updates: Partial<Mission>
): Promise<Mission> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('missions')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', missionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeMission(missionId: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabase
    .from('missions')
    .update({ completed: true, updated_at: new Date().toISOString() })
    .eq('id', missionId);

  if (error) throw error;
}

export async function createDailyMissions(userId: string): Promise<Mission[]> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const dailyMissions = [
    {
      user_id: userId,
      title: 'Registre 3 Refeições',
      description: 'Complete seu diário alimentar de hoje',
      points: 30,
      type: 'daily' as const,
      completed: false,
      icon: '🍽️',
      requirement: 3,
      progress: 0,
    },
    {
      user_id: userId,
      title: 'Complete 1 Treino',
      description: 'Faça pelo menos um exercício hoje',
      points: 40,
      type: 'daily' as const,
      completed: false,
      icon: '💪',
      requirement: 1,
      progress: 0,
    },
    {
      user_id: userId,
      title: 'Rotina de Skincare',
      description: 'Complete sua rotina matinal e noturna',
      points: 25,
      type: 'daily' as const,
      completed: false,
      icon: '✨',
      requirement: 2,
      progress: 0,
    },
    {
      user_id: userId,
      title: 'Beba 2L de Água',
      description: 'Mantenha-se hidratado durante o dia',
      points: 20,
      type: 'daily' as const,
      completed: false,
      icon: '💧',
      requirement: 2,
      progress: 0,
    },
  ];

  const { data, error } = await supabase
    .from('missions')
    .insert(dailyMissions)
    .select();

  if (error) throw error;
  return data || [];
}
