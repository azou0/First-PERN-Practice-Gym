export interface UserProfile {
        user_id: string;
        goal: string;
        experience: "beginner" | "intermediate" | "advanced";
        days_per_week: number;
        sessionLength: number;
        equipment: 'full_gym' | 'home' | 'dumbbells';
        injuries?: string;
        preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
        updated_at: string;
}

export interface PlanOverview {
    goal: string;
    frequency: string;
    split: string;
    notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface DaySchedule {
    day: string;
    focus: string;
    excercises: Exercise[];
}

export interface TrainingPlan {
      id: string;
      user_id: string;
      //plan_json: Json;
      weeklySchedule: DaySchedule[];
      plan_text: string;
      version: number;
      overview: PlanOverview;
      created_at: string;
}