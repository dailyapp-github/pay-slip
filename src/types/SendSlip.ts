export interface SendSlipPreviewRow {
  recipient: {
    _id: string;
    nik: string;
    name: string;
    email: string;
    password: string;
  } | null;

  status: 'READY' | 'RECIPIENT_NOT_FOUND';

  employee: {
    label: string;
    value: string | number;
  }[];

  benefits: {
    label: string;
    amount: number;
  }[];

  deductions: {
    label: string;
    amount: number;
  }[];

  informations: {
    label: string;
    value: string | number;
  }[];

  totalBenefit: number;
  totalDeduction: number;
  netSalary: number;
}

export interface SendSlipPreview {
  companyId: string;
  total: number;
  success: number;
  failed: number;
  rows: SendSlipPreviewRow[];
}
