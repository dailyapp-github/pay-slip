export interface MailSetting {
  id: number;

  companyId: number;
  companyName: string;

  senderName: string;
  senderEmail: string;

  smtpHost: string;
  smtpPort: number;

  username: string;
  password: string;

  ssl: boolean;
  tls: boolean;

  active: boolean;
}

export interface MailTemplate {
  subject: string;
  header: string;
  body: string;
  footer: string;
}
