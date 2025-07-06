interface Location {
  cityId: number;
  city: string;
  district: string;
}

export interface TrainerBackend {
  user_id: number;
  name: string;
  last_name: string;
  mean_of_stars: number;
  opinions_count: number;
  locations: Location[];
  types: string[];
}

export type TrainerCardProps = {
  trainerId: number;
  name: string;
  lastName: string;
  meanOfStars: number | null;
  opinionsCount: number | null;
  locations: Location[];
  types: string[];
};

export type TrainerProfilePageProps = {
  trainerId: number;
};
