import { supabase } from './supabase';
import type { SkincareRoutine, Meal, Workout, Mission, DailyRoutine } from './database.types';

// ============= SKINCARE API =============

export const skincareAPI = {
  // Buscar todas as rotinas de skincare do usuário
  async getAll(userId: string): Promise<SkincareRoutine[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('skincare_routines')
      .select('*')
      .eq('user_id', userId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Adicionar nova rotina
  async create(routine: Omit<SkincareRoutine, 'id' | 'created_at'>): Promise<SkincareRoutine> {
    if (!supabase) throw new Error('Supabase não configurado');
    
    const { data, error } = await supabase
      .from('skincare_routines')
      .insert([routine])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Marcar como completo
  async complete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('skincare_routines')
      .update({ 
        completed: true, 
        completed_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw error;
  },

  // Deletar rotina
  async delete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('skincare_routines')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// ============= MEALS API =============

export const mealsAPI = {
  // Buscar todas as refeições do usuário
  async getAll(userId: string): Promise<Meal[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Adicionar nova refeição
  async create(meal: Omit<Meal, 'id' | 'created_at'>): Promise<Meal> {
    if (!supabase) throw new Error('Supabase não configurado');
    
    const { data, error } = await supabase
      .from('meals')
      .insert([meal])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Marcar como completo
  async complete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('meals')
      .update({ 
        completed: true, 
        completed_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw error;
  },

  // Deletar refeição
  async delete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// ============= WORKOUTS API =============

export const workoutsAPI = {
  // Buscar todos os treinos do usuário
  async getAll(userId: string): Promise<Workout[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Adicionar novo treino
  async create(workout: Omit<Workout, 'id' | 'created_at'>): Promise<Workout> {
    if (!supabase) throw new Error('Supabase não configurado');
    
    const { data, error } = await supabase
      .from('workouts')
      .insert([workout])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Marcar como completo
  async complete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('workouts')
      .update({ 
        completed: true, 
        completed_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw error;
  },

  // Deletar treino
  async delete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// ============= MISSIONS API =============

export const missionsAPI = {
  // Buscar todas as missões do usuário
  async getAll(userId: string): Promise<Mission[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Adicionar nova missão
  async create(mission: Omit<Mission, 'id' | 'created_at'>): Promise<Mission> {
    if (!supabase) throw new Error('Supabase não configurado');
    
    const { data, error } = await supabase
      .from('missions')
      .insert([mission])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Marcar como completo
  async complete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('missions')
      .update({ 
        completed: true, 
        completed_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw error;
  },

  // Deletar missão
  async delete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('missions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// ============= DAILY ROUTINE API =============

export const dailyRoutineAPI = {
  // Buscar todas as rotinas diárias do usuário
  async getAll(userId: string): Promise<DailyRoutine[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('daily_routines')
      .select('*')
      .eq('user_id', userId)
      .order('task_time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Adicionar nova rotina diária
  async create(routine: Omit<DailyRoutine, 'id' | 'created_at'>): Promise<DailyRoutine> {
    if (!supabase) throw new Error('Supabase não configurado');
    
    const { data, error } = await supabase
      .from('daily_routines')
      .insert([routine])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Marcar como completo
  async complete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('daily_routines')
      .update({ 
        completed: true, 
        completed_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw error;
  },

  // Resetar todas as tarefas (para novo dia)
  async resetAll(userId: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('daily_routines')
      .update({ 
        completed: false, 
        completed_at: null 
      })
      .eq('user_id', userId);

    if (error) throw error;
  },

  // Deletar rotina diária
  async delete(id: string): Promise<void> {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('daily_routines')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
