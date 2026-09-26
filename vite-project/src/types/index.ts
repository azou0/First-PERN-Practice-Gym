export interface User {
    id: string;
    email: string;
    createdAt: string;
}

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


export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

/*
const goalOptions = [
    "bulk" | "cut" | "maintain" | "strength" | "endurance"
];

const experienceOptions = [
    "beginner" | "intermediate" | "advanced"
];

const daysOptions = [
    { value: "2", label: "2 days per week"},
    { value: "3", label: "3 days per week"},
    { value: "4", label: "4 days per week"},
    { value: "5", label: "5 days per week"},
    { value: "6", label: "6 days per week"},
];

const sessionOptions = [
    { value: '30', label: '30 minutes'},
    { value: '40', label: '40 minutes'},
    { value: '50', label: '50 minutes'},
    { value: '60', label: '60 minutes'},
];

const equipmentOptions = [
    'full_gym' | 'home' | 'dumbbells'
];

const splitOptions = [
    "full_body" | "upper_lower" | "ppl" | "custom"
];
*/