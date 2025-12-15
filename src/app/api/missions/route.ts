import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Listar todas as missões e progresso do usuário
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

    // Buscar todas as missões
    const { data: missions, error: missionsError } = await supabase
      .from('missions')
      .select('*')
      .order('difficulty', { ascending: true });

    if (missionsError) {
      return NextResponse.json(
        { error: missionsError.message },
        { status: 500 }
      );
    }

    // Buscar progresso do usuário
    const { data: userMissions, error: userMissionsError } = await supabase
      .from('user_missions')
      .select('*')
      .eq('user_id', session.user.id);

    if (userMissionsError) {
      return NextResponse.json(
        { error: userMissionsError.message },
        { status: 500 }
      );
    }

    // Combinar dados
    const missionsWithProgress = missions?.map(mission => {
      const userMission = userMissions?.find(um => um.mission_id === mission.id);
      return {
        ...mission,
        completed: userMission?.completed || false,
        completed_at: userMission?.completed_at || null,
        user_mission_id: userMission?.id || null,
      };
    });

    return NextResponse.json({ data: missionsWithProgress });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Completar uma missão
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
    const { mission_id } = body;

    if (!mission_id) {
      return NextResponse.json(
        { error: 'mission_id é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se a missão existe
    const { data: mission, error: missionError } = await supabase
      .from('missions')
      .select('*')
      .eq('id', mission_id)
      .single();

    if (missionError || !mission) {
      return NextResponse.json(
        { error: 'Missão não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se já existe registro
    const { data: existingUserMission } = await supabase
      .from('user_missions')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('mission_id', mission_id)
      .single();

    let userMission;

    if (existingUserMission) {
      // Atualizar existente
      const { data, error } = await supabase
        .from('user_missions')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', existingUserMission.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      userMission = data;
    } else {
      // Criar novo
      const { data, error } = await supabase
        .from('user_missions')
        .insert([
          {
            user_id: session.user.id,
            mission_id,
            completed: true,
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

      userMission = data;
    }

    // Atualizar pontos do usuário
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('points')
      .eq('id', session.user.id)
      .single();

    const newPoints = (profile?.points || 0) + mission.points_reward;

    await supabase
      .from('user_profiles')
      .update({ points: newPoints })
      .eq('id', session.user.id);

    return NextResponse.json({
      data: userMission,
      points_earned: mission.points_reward,
      new_total_points: newPoints,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
