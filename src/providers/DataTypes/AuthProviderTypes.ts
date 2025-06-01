export interface RegisterInputs {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterDataPayload {
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export type userTypeData = "user" | "trainer";

export interface AuthContextType {
  accessToken: string | null;
  role: string;
  logIn: (data: LoginInputs) => Promise<void>;
  logOut: () => void;
  register: (
    data: RegisterDataPayload,
    userType: userTypeData,
  ) => Promise<void>;
  isAuthenticated: boolean;
}
