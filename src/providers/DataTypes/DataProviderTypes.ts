export interface AdminData {
  counts: {
    usersCount: number;
    trainersCount: number;
    adminsCount: number;
  };
  users: [
    {
      name: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      type: string;
      isMailVerified: boolean;
      isAdmin: boolean;
    },
  ];
}

export type RoleData = {
  admin?: AdminData;
};

export interface DataContextType {
  data: RoleData;
}
