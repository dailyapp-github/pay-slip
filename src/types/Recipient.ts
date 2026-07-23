// export interface Recipient {
//   _id?: string;

//   companyId: string;

//   companyName?: string;

//   nik: string;

//   name: string;

//   email: string;

//   password: string;

//   active: boolean;
// }

export interface Recipient {
  _id?: string;

  userId?: string;

  companyId: string;

  companyName?: string;

  companyCode?: string;

  nik: string;

  name: string;

  email: string;

  pdfPassword: string;

  active: boolean;
}
