'use server';

import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/supabase-types';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function createUserProfile(
  userId: string,
  email: string,
  fullName?: string
): Promise<UserProfile> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        id: userId,
        email,
        full_name: fullName,
        points: 0,
        level: 1,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<UserProfile> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addPoints(userId: string, points: number): Promise<UserProfile> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const profile = await getUserProfile(userId);
  if (!profile) {
    throw new Error('Perfil não encontrado');
  }

  const newPoints = profile.points + points;
  const newLevel = Math.floor(newPoints / 100) + 1;

  return updateUserProfile(userId, {
    points: newPoints,
    level: newLevel,
  });
}
