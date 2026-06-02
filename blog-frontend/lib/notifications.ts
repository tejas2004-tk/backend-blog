import { notification } from 'antd';

export const showSuccess = (message: string, description?: string) => {
  notification.success({
    message,
    description,
    duration: 4,
  });
};

export const showError = (message: string, description?: string) => {
  notification.error({
    message,
    description,
    duration: 4,
  });
};

export const showInfo = (message: string, description?: string) => {
  notification.info({
    message,
    description,
    duration: 4,
  });
};

export const showWarning = (message: string, description?: string) => {
  notification.warning({
    message,
    description,
    duration: 4,
  });
};
