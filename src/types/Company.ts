export interface Company {
  _id?: string;

  name: string;
  code: string;

  isActive?: boolean;

  logo?: string;
  phone?: string;
  website?: string;
  address?: string;
}
