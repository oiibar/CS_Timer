export interface UserData {
  email: string;
  password: string;
  username?: string;
}

export interface ResponseUser {
  email: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export interface ResponseUserData {
  token: string;
  user: ResponseUser;
}

export interface User {
  id: number;
  email: string;
  username: string;
  token: string;
}

export interface Session {
  id: number;
  scramble: string;
  time: number;
  extraTwo: boolean;
  DNF: boolean;
  created_at: string;
  updated_at: string;
}
