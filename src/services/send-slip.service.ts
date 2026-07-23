import api from '../api/axios';
import { API } from '../api/endpoints';

export const SendSlipService = {
  async preview(companyId: string, period: string, file: File) {
    const formData = new FormData();

    formData.append('companyId', companyId);
    formData.append('period', period);
    formData.append('file', file);

    const response = await api.post(`${API.SEND_SLIP}/preview`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  // async generate(previewId: string) {
  //   const response = await api.post(`${API.SEND_SLIP}/generate`, {
  //     previewId,
  //   });

  //   return response.data.data;
  // },

  async generate(previewId: string, selectedRows: (string | number)[]) {
    const response = await api.post(`${API.SEND_SLIP}/generate`, {
      previewId,
      selectedRows,
    });

    return response.data.data;
  },

  // async send(previewId: string) {
  //   const response = await api.post(`${API.SEND_SLIP}/send`, {
  //     previewId,
  //   });

  //   return response.data.data;
  // },
  async send(previewId: string, selectedRows: (string | number)[]) {
    const response = await api.post(`${API.SEND_SLIP}/send`, {
      previewId,
      selectedRows,
    });

    return response.data.data;
  },
};
