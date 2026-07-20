import api from '../api/axios';
import { API } from '../api/endpoints';

export const MailTemplateService = {
  async getByCompany(companyId: string) {
    const response = await api.get(`${API.MAIL_TEMPLATE}/company/${companyId}`);

    return response.data.data;
  },

  async save(companyId: string, content: string) {
    const response = await api.put(
      `${API.MAIL_TEMPLATE}/company/${companyId}`,
      {
        content,
      },
    );

    return response.data.data;
  },
};
