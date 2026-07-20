import { TUser } from '../types/User';
import api from '../api/axios';
import { API } from '../api/endpoints';

export const UserService = {
  async getAll(): Promise<TUser[]> {
    const response = await api.get(API.USER);

    return response.data.data;
  },

  async create(user: TUser): Promise<TUser> {
    const response = await api.post(API.USER, {
      username: user.username,
      email: user.email,
      password: user.password,
      emailPassword: user.emailPassword,
      role: user.role.toLocaleLowerCase(),
    });

    return response.data.data;
  },

  async update(user: TUser): Promise<TUser> {
    const response = await api.put(`${API.USER}/${user._id}`, {
      username: user.username,
      email: user.email,
      password: user.password,
      emailPassword: user.emailPassword,
      role: user.role.toLocaleLowerCase(),
    });
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    // alert('SERVICE' + JSON.stringify(company));
    const response = await api.delete(`${API.USER}/${id}`);
    return response.data.data;
  },
};
