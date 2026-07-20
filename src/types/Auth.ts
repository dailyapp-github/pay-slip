export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  username: string;
  email: string;
  role: 'administrator' | 'user';
}

export interface LoginResponse {
  token: string;
  user: LoginUser;
}
