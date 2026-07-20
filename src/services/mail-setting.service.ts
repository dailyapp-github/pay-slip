import { MailSetting } from '../types/MailSetting';
import { mailSettingMock } from '../mocks/mail.mock';

let datas = [...mailSettingMock];

export const MailSettingService = {
  async getAll(): Promise<MailSetting[]> {
    return [...datas];
  },

  async create(data: MailSetting) {
    datas.push({
      ...data,
      id: Date.now(),
    });
  },

  async update(data: MailSetting) {
    datas = datas.map((item) => (item.id === data.id ? data : item));
  },

  async delete(id: number) {
    datas = datas.filter((item) => item.id !== id);
  },
};
