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

export type UserProfileContentProps = {
  user?: UserBackend;
};
