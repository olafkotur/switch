import { useCallback } from 'react';
import { toast, ToastContainerProps, ToastOptions, TypeOptions } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { ThemeState } from '../state';
import { useTheme } from '../hooks';

export const useToast = (type: TypeOptions) => {
  const options: ToastOptions = {
    type,
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
  const themeState = useRecoilValue(ThemeState);

  return {
    theme: themeState,
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
