export type UserRole = 'Admin' | 'General User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserFull extends User {
  password?: string;
}
