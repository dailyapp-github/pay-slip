// import api from '../api/axios';
// import { API } from '../api/endpoints';
// import { Recipient } from '../types/Recipient';

// export const RecipientService = {
//   async getAll(): Promise<Recipient[]> {
//     const response = await api.get(API.RECIPIENT);

//     return response.data.data;
//   },

//   async create(data: Recipient) {
//     const response = await api.post(API.RECIPIENT, data);

//     return response.data.data;
//   },

//   async update(data: Recipient) {
//     const response = await api.put(`${API.RECIPIENT}/${data._id}`, data);

//     return response.data.data;
//   },

//   async delete(id: string) {
//     await api.delete(`${API.RECIPIENT}/${id}`);
//   },

//   async import(file: File) {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await api.post(`${API.RECIPIENT}/import`, formData, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data',
//       //   },
//       // Memaksa Axios untuk tidak melempar error selama HTTP status di bawah 500
//       validateStatus: (status) => status >= 200 && status < 500,
//     });

//     if (response.data.status === 1000) {
//       return response.data;
//     } else {
//       return null;
//     }
//   },
// };

import api from '../api/axios';
import { API } from '../api/endpoints';
import { Recipient } from '../types/Recipient';

export const RecipientService = {
  async getAll(): Promise<Recipient[]> {
    const response = await api.get(API.RECIPIENT);

    return response.data.data;
  },

  async create(data: Recipient): Promise<Recipient> {
    const response = await api.post(API.RECIPIENT, {
      companyId: data.companyId,
      nik: data.nik,
      name: data.name,
      email: data.email,
      pdfPassword: data.pdfPassword,
      active: data.active,
    });

    return response.data.data;
  },

  async update(data: Recipient): Promise<Recipient> {
    const response = await api.put(`${API.RECIPIENT}/${data._id}`, {
      companyId: data.companyId,
      nik: data.nik,
      name: data.name,
      email: data.email,
      pdfPassword: data.pdfPassword,
      active: data.active,
    });

    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${API.RECIPIENT}/${id}`);
  },

  async import(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`${API.RECIPIENT}/import`, formData, {
      validateStatus: (status) => status >= 200 && status < 500,
    });

    return response.data.status === 1000 ? response.data : null;
  },
};
