import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();

    switch (action) {
      case 'generate_skincare_routine':
        return await generateSkincareRoutine(data);
      
      case 'generate_meal_plan':
        return await generateMealPlan(data);
      
      case 'generate_workout':
        return await generateWorkout(data);
      
      case 'generate_missions':
        return await generateMissions(data);
      
      case 'analyze_progress':
        return await analyzeProgress(data);
      
      default:
        return NextResponse.json(
          { error: 'Ação não reconhecida' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('Erro na API de IA:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}

async function generateSkincareRoutine(data: any) {
  const { skinType, concerns, timeOfDay } = data;

  const prompt = `Crie uma rotina de skincare ${timeOfDay === 'morning' ? 'matinal' : 'noturna'} para alguém com:
- Tipo de pele: ${skinType}
- Preocupações: ${concerns.join(', ')}

Retorne um JSON com o seguinte formato:
{
  "title": "Nome da rotina",
  "description": "Descrição breve",
  "steps": [
    {
      "order": 1,
      "name": "Nome do passo",
      "product": "Tipo de produto",
      "duration": "Tempo estimado",
      "instructions": "Instruções detalhadas"
    }
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um especialista em skincare que cria rotinas personalizadas. Sempre retorne respostas em JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return NextResponse.json(result);
}

async function generateMealPlan(data: any) {
  const { dietType, goals, restrictions, mealType } = data;

  const prompt = `Crie uma refeição saudável (${mealType}) para alguém com:
- Tipo de dieta: ${dietType}
- Objetivos: ${goals.join(', ')}
- Restrições: ${restrictions.join(', ') || 'Nenhuma'}

Retorne um JSON com o seguinte formato:
{
  "title": "Nome da refeição",
  "description": "Descrição breve",
  "calories": 500,
  "protein": 30,
  "carbs": 50,
  "fats": 20,
  "ingredients": ["ingrediente 1", "ingrediente 2"],
  "instructions": ["passo 1", "passo 2"]
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um nutricionista que cria planos alimentares personalizados. Sempre retorne respostas em JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return NextResponse.json(result);
}

async function generateWorkout(data: any) {
  const { fitnessLevel, goals, duration, equipment } = data;

  const prompt = `Crie um treino para alguém com:
- Nível de fitness: ${fitnessLevel}
- Objetivos: ${goals.join(', ')}
- Duração desejada: ${duration} minutos
- Equipamentos disponíveis: ${equipment.join(', ') || 'Nenhum (peso corporal)'}

Retorne um JSON com o seguinte formato:
{
  "title": "Nome do treino",
  "description": "Descrição breve",
  "duration": ${duration},
  "exercises": [
    {
      "name": "Nome do exercício",
      "sets": 3,
      "reps": "10-12",
      "rest": "60s",
      "instructions": "Como executar",
      "muscles": ["músculo 1", "músculo 2"]
    }
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um personal trainer que cria treinos personalizados. Sempre retorne respostas em JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return NextResponse.json(result);
}

async function generateMissions(data: any) {
  const { userLevel, interests, completedMissions } = data;

  const prompt = `Crie 5 missões diárias para um usuário nível ${userLevel} com interesses em: ${interests.join(', ')}.
Evite missões similares a: ${completedMissions.join(', ') || 'Nenhuma'}

Retorne um JSON com o seguinte formato:
{
  "missions": [
    {
      "title": "Título da missão",
      "description": "Descrição detalhada",
      "category": "skincare|fitness|nutrition|wellness",
      "difficulty": "easy|medium|hard",
      "points": 10
    }
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um coach de bem-estar que cria missões motivadoras. Sempre retorne respostas em JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.8,
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return NextResponse.json(result);
}

async function analyzeProgress(data: any) {
  const { stats, goals } = data;

  const prompt = `Analise o progresso do usuário:
- Estatísticas: ${JSON.stringify(stats)}
- Objetivos: ${goals.join(', ')}

Retorne um JSON com o seguinte formato:
{
  "summary": "Resumo do progresso",
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "improvements": ["área para melhorar 1", "área para melhorar 2"],
  "recommendations": ["recomendação 1", "recomendação 2"],
  "motivationalMessage": "Mensagem motivacional personalizada"
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um coach motivacional que analisa progresso e dá feedback construtivo. Sempre retorne respostas em JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return NextResponse.json(result);
}
