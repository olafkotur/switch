import { useCallback } from 'react';
import { toast, ToastContainerProps, ToastOptions, TypeOptions } from 'react-toastify';
import { useTheme } from '../hooks';

export const useToast = (type: TypeOptions, duration = 5000) => {
  const options: ToastOptions = {
    type,
    autoClose: duration,
  };

  return useCallback(
    (message: string) => {
      return toast(message, options);
    },
    [options],
  );
};

export const useGetToastProps = (): ToastContainerProps => {
  const theme = useTheme();

  return {
    theme: theme.name,
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: 5000,
    newestOnTop: true,
    draggable: true,
    toastStyle: {
      background: theme.backgroundColor.primary,
    },
  };
};
