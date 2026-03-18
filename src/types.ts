export interface WorkoutPlan {
  title: string;
  description: string;
  schedule: {
    day: string;
    activity: string;
    details: string;
  }[];
  tips: string[];
}

export interface WorkoutPreferences {
  sport: string;
  goals: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  frequency: number;
  duration: number;
  additionalInfo?: string;
}
