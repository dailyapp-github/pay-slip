export interface TUser {
  username: string;
  email: string;
  password: string;
  emailPassword: string;
  _id?: string;
  active: boolean;
  role: 'administrator' | 'user';
}
