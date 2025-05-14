export interface RegisterData {
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
  register: (data: RegisterData, userType: userTypeData) => Promise<void>;
  isAuthenticated: boolean;
}
