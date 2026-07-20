import api from '../api/axios';
import { API } from '../api/endpoints';

import { Company } from '../types/Company';

export const CompanyService = {
  async getAll(): Promise<Company[]> {
    const response = await api.get(API.COMPANY);

    console.log(response);

    return response.data.data;
  },

  async create(company: Company): Promise<Company> {
    const response = await api.post(API.COMPANY, {
      name: company.name,
      code: company.code,
    });
    return response.data.data;
  },

  async update(company: Company): Promise<Company> {
    // alert('SERVICE' + JSON.stringify(company));
    const response = await api.put(`${API.COMPANY}/${company._id}`, {
      name: company.name,
      code: company.code,
    });

    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    // alert('SERVICE' + JSON.stringify(company));
    const response = await api.delete(`${API.COMPANY}/${id}`);
    return response.data.data;
  },
};
