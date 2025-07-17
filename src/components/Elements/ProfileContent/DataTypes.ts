export type UserBackend = {
  user_id: number;
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  is_mail_verified: boolean;
  status: string;
  type: string;
  is_admin: boolean;
};

export type CommonProfileContentProps = {
  user?: UserBackend;
};

export interface TrainerProfileContentProps {
  trainerId: number;
}

type TrainerLocation = {
  city: string;
  district: string;
};

export type TrainerBackendContent = {
  user_id: number;
  name: string;
  last_name: string;
  phone_number: string;
  mean_of_stars: number;
  license_id: number;
  opinions_count: number;
  locations: TrainerLocation[];
  types: string[];
  description: string;
};
