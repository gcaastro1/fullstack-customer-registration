import { toast } from 'react-toastify';

interface IToastProps {
  message: string;
  isSuccess?: boolean;
}

const Toast = ({ message, isSuccess = false }: IToastProps) => {
  return isSuccess
    ? toast.success(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    : toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
};

export default Toast;
