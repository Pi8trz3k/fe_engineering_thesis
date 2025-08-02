export interface TrainingPlan {
  training_plan_id: string;
  title: string;
  client_id: number;
  trainer_id?: number;
  workouts: string[];
}

export type Workout = {
  client_id: number;
  exercises: Exercise[];
  is_training_done: boolean;
  title: string;
  trainer_id: number;
  training_plan_id: string;
  workout_date: string;
  workout_id: string;
};

export type Exercise = {
  exercise_id?: string;
  exercise_name: string;
  sets: string;
  weight: string;
  description: string;
  workout_id?: string;
};

export type WorkoutFormData = {
  title: string;
  exercises: Exercise[];
};

export type Achievement = {
  achievement_id: string;
  exercise_id: string;
  user_id: number;
};
