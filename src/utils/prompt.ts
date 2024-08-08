import { Notify } from 'quasar';

// 错误提示
export const Notifying = (type:any, msg: string) => {
  Notify.create({
    type,
    position: 'top',
    timeout: 2000,
    message: msg
  });
};

