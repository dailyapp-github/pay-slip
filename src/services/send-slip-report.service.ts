import api from '../api/axios';
import { API } from '../api/endpoints';

import { SendSlipReport } from '../types/SendSlipReport';

export const SendSlipReportService = {
  async getAll(): Promise<SendSlipReport[]> {
    console.log('GET REPORT');

    const response = await api.get(API.SEND_SLIP + '/get-report');

    return response.data.data;
  },
};
