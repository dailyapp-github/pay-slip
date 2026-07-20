export interface ExcelTemplateColumn {
  header: string;
  label: string;
  type:
    | 'employee'
    | 'benefit'
    | 'deduction'
    | 'totalBenefit'
    | 'totalDeduction'
    | 'netSalary'
    | 'information';

  required: boolean;
}

export interface ExcelTemplate {
  _id?: string;

  companyId: string;

  companyName?: string;

  active: boolean;

  columns: ExcelTemplateColumn[];
}
