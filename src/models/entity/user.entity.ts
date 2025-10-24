export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
}
