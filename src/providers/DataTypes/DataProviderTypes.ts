export interface AdminData {
  usersCount: number;
  trainersCount: number;
  adminsCount: number;
}

export type RoleData = {
  admin?: AdminData;
};

export interface DataContextType {
  data: RoleData;
}
