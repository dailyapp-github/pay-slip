// import api from '../api/axios';
// import { API } from '../api/endpoints';
// import { ExcelTemplate } from '../types/ExcelTemplate';

// export const ExcelTemplateService = {
//   async getAll(): Promise<ExcelTemplate[]> {
//     const response = await api.get(API.EXCEL_TEMPLATE);
//     return response.data.data;
//   },

//   async getByCompany(companyId: string): Promise<ExcelTemplate | null> {
//     const response = await api.get(`${API.EXCEL_TEMPLATE}/${companyId}`);

//     return response.data.data;
//   },

//   async create(data: ExcelTemplate): Promise<ExcelTemplate> {
//     const response = await api.post(API.EXCEL_TEMPLATE, data);
//     return response.data.data;
//   },

//   async update(data: ExcelTemplate): Promise<ExcelTemplate> {
//     const response = await api.put(`${API.EXCEL_TEMPLATE}/${data._id}`, data);

//     return response.data.data;
//   },

//   async delete(id: string): Promise<void> {
//     await api.delete(`${API.EXCEL_TEMPLATE}/${id}`);
//   },

//   async downloadTemplate() {
//     const response = await api.get(`${API.EXCEL_TEMPLATE}/export`, {
//       responseType: 'blob',
//     });

//     const blob = new Blob([response.data], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });

//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement('a');

//     const disposition = response.headers['content-disposition'];

//     let filename = 'Payslip-Excel-Template.xlsx';

//     if (disposition) {
//       const match = disposition.match(/filename="?(.+?)"?$/);

//       if (match?.[1]) {
//         filename = match[1];
//       }
//     }

//     link.href = url;
//     link.download = filename;

//     document.body.appendChild(link);
//     link.click();

//     link.remove();
//     window.URL.revokeObjectURL(url);
//   },
// };

import api from '../api/axios';
import { API } from '../api/endpoints';
import { ExcelTemplate } from '../types/ExcelTemplate';

export const ExcelTemplateService = {
  async getAll(): Promise<ExcelTemplate[]> {
    const response = await api.get(API.EXCEL_TEMPLATE);

    return response.data.data;
  },

  async save(data: ExcelTemplate): Promise<ExcelTemplate> {
    // console.log('SAVE DATA');
    // console.log(data);
    // console.log('companyId =', data.companyId);
    // console.log('typeof =', typeof data.companyId);

    const response = await api.put(
      `${API.EXCEL_TEMPLATE}/company/${data.companyId}`,
      {
        active: data.active,
        columns: data.columns,
      },
    );

    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${API.EXCEL_TEMPLATE}/${id}`);
  },

  async duplicate(
    sourceCompanyId: string,
    destinationCompanyIds: string[],
    overwrite = false,
  ) {
    const response = await api.post(`${API.EXCEL_TEMPLATE}/duplicate`, {
      sourceCompanyId,
      destinationCompanyIds,
      overwrite,
    });

    return response.data.data;
  },

  async downloadTemplate() {
    const response = await api.get(`${API.EXCEL_TEMPLATE}/export`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    let filename = 'Payslip-Excel-Template.xlsx';

    const disposition = response.headers['content-disposition'];

    if (disposition) {
      const match = disposition.match(/filename="?(.+?)"?$/);

      if (match?.[1]) {
        filename = match[1];
      }
    }

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
