import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Listar rotinas diárias do usuário
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 503 }
      );
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('daily_routines')
      .select('*')
      .eq('user_id', session.user.id)
      .order('time', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Buscar conclusões de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: completions } = await supabase
      .from('user_routine_completions')
      .select('routine_id')
      .eq('user_id', session.user.id)
      .gte('completed_at', today.toISOString());

    const completedIds = new Set(completions?.map(c => c.routine_id) || []);

    const routinesWithStatus = data?.map(routine => ({
      ...routine,
      completed_today: completedIds.has(routine.id),
    }));

    return NextResponse.json({ data: routinesWithStatus });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar nova rotina diária
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 503 }
      );
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, time, days_of_week, category, icon } = body;

    if (!title || !time || !category || !icon) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, time, category, icon' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('daily_routines')
      .insert([
        {
          user_id: session.user.id,
          title,
          description,
          time,
          days_of_week: days_of_week || [0, 1, 2, 3, 4, 5, 6],
          category,
          icon,
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PATCH - Marcar rotina como completa
export async function PATCH(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 503 }
      );
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { routine_id } = body;

    if (!routine_id) {
      return NextResponse.json(
        { error: 'routine_id é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se já foi completada hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: existing } = await supabase
      .from('user_routine_completions')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('routine_id', routine_id)
      .gte('completed_at', today.toISOString())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Rotina já completada hoje' },
        { status: 400 }
      );
    }

    // Criar conclusão
    const { data, error } = await supabase
      .from('user_routine_completions')
      .insert([
        {
          user_id: session.user.id,
          routine_id,
          completed_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Adicionar pontos (10 pontos por rotina completada)
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('points')
      .eq('id', session.user.id)
      .single();

    const newPoints = (profile?.points || 0) + 10;

    await supabase
      .from('user_profiles')
      .update({ points: newPoints })
      .eq('id', session.user.id);

    return NextResponse.json({
      data,
      points_earned: 10,
      new_total_points: newPoints,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar rotina diária
export async function DELETE(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 503 }
      );
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID é obrigatório' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('daily_routines')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
