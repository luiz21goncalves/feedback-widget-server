interface MailAddress {
  name: string;
  email: string;
}

export interface SendMailData {
  subject: string;
  body: string;
  to: MailAddress;
  from: MailAddress;
}

export interface MailAdapter {
  sendMail(data: SendMailData): Promise<void>;
}
