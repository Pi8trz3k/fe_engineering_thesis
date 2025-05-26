export interface AdminData {
  counts: {
    usersCount: number;
    trainersCount: number;
    adminsCount: number;
  };
  users: FrontendUser[];
}

interface BaseUser {
  name: string;
  email: string;
  type: string;
  status: string;
}

export interface BackendUser extends BaseUser {
  user_id: number;
  last_name: string;
  phone_number: string;
  is_mail_verified: boolean;
  is_admin: boolean;
}

export interface FrontendUser extends BaseUser {
  userID: number;
  lastName: string;
  phoneNumber: string;
  isMailVerified: boolean;
  isAdmin: boolean;
}

export type RoleData = {
  admin?: AdminData;
};

export interface DataContextType {
  data: RoleData;
  fetchData: () => Promise<void>;
}
