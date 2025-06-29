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
}

export type TrainerCardProps = {
  name: string;
  lastName: string;
  meanOfStars: number | null;
  opinionsCount: number | null;
  locations: Location[];
};
