import { showMessage, MessageType } from 'react-native-flash-message';

export const showToast = (
  title: string,
  description: string,
  type: MessageType // 'success' | 'info' | 'warning' | 'danger'
): void => {
  showMessage({
    message: title,
    description: description,
    type: type,
    duration:2000,
    animationDuration:400
  });
};
