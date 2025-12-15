// Serviço para interagir com a API de IA

export interface SkincareRoutineRequest {
  skinType: 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal';
  concerns: string[];
  timeOfDay: 'morning' | 'night';
}

export interface MealPlanRequest {
  dietType: 'balanced' | 'vegetarian' | 'vegan' | 'keto' | 'paleo';
  goals: string[];
  restrictions: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface WorkoutRequest {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  duration: number;
  equipment: string[];
}

export interface MissionsRequest {
  userLevel: number;
  interests: string[];
  completedMissions: string[];
}

export interface ProgressAnalysisRequest {
  stats: {
    skincare_completed: number;
    meals_completed: number;
    workouts_completed: number;
    missions_completed: number;
    total_points: number;
  };
  goals: string[];
}

// Helper para garantir URL absoluta
function getApiUrl(path: string): string {
  // Se estamos no browser
  if (typeof window !== 'undefined') {
    const baseUrl = window.location.origin;
    return `${baseUrl}${path}`;
  }
  // Fallback para server-side
  return path;
}

class AIService {
  private async callAI(action: string, data: any) {
    try {
      const apiUrl = getApiUrl('/api/ai');
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, data }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao chamar API de IA');
      }

      return await response.json();
    } catch (error: any) {
      console.error(`Erro ao executar ${action}:`, error);
      throw error;
    }
  }

  async generateSkincareRoutine(request: SkincareRoutineRequest) {
    return this.callAI('generate_skincare_routine', request);
  }

  async generateMealPlan(request: MealPlanRequest) {
    return this.callAI('generate_meal_plan', request);
  }

  async generateWorkout(request: WorkoutRequest) {
    return this.callAI('generate_workout', request);
  }

  async generateMissions(request: MissionsRequest) {
    return this.callAI('generate_missions', request);
  }

  async analyzeProgress(request: ProgressAnalysisRequest) {
    return this.callAI('analyze_progress', request);
  }
}

export const aiService = new AIService();
