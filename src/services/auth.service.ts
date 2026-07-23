import api from '../api/axios';
import { API } from '../api/endpoints';

export const AuthService = {
  async login(email: string, password: string) {
    // alert('DISINI YAK LOGIN');
    // const response = await api.post(API.AUTH + 'login', {
    //   email,
    //   password,
    // });
    // alert(JSON.stringify(response));
    // return response.data.data;

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // console.log('SUCCESS', response.data);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response) {
        console.log('STATUS', err.response.status);
        console.log('DATA', err.response.data);
      }
    }
  },

  async me() {
    const response = await api.get(API.AUTH + 'me');

    return response.data.data;
  },
};
