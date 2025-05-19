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
}

export interface BackendUser extends BaseUser {
  last_name: string;
  phone_number: string;
  is_mail_verified: boolean;
  is_admin: boolean;
}

export interface FrontendUser extends BaseUser {
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
}
