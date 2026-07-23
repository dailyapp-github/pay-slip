export interface SendSlipReport {
  _id: string;

  employeeName: string;
  employeeNik: string;
  period: string;

  status: 'SUCCESS' | 'FAILED';

  companyId?: string;
  companyName?: string;

  userId?: string;

  email?: string;

  createdAt: string;
}
