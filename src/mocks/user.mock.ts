import { TUser } from '../types/User';

export const userMock: TUser[] = [
  {
    _id: '1',
    username: 'admin',
    email: 'admin@company.com',
    password: 'password',
    emailPassword: 'emailPassword',
    active: true,
    role: 'administrator',
  },
  {
    _id: '2',
    username: 'PT ABC Indonesia',
    email: 'hr@abc.co.id',
    password: 'password',
    emailPassword: 'emailPassword',
    active: true,
    role: 'user',
  },
  {
    _id: '3',
    username: 'PT XYZ Corporation',
    email: 'hr@xyz.com',
    password: 'password',
    emailPassword: 'emailPassword',
    active: false,
    role: 'user',
  },
];
