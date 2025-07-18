interface Location {
  cityId: number;
  name: string;
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
  description: string;
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

export type OpinionBackend = {
  opinion_id: number;
  description: string;
  number_of_stars: number;
  user_id: number;
  trainer_id: number;
};

export type OpinionCardProps = {
  description: string;
  numberOfStars: number;
};
