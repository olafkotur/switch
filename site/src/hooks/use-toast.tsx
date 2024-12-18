import React, { useCallback, useMemo } from 'react';
import { ToastContainerProps, ToastOptions, toast } from 'react-toastify';
import { useTheme } from '.';
import { Icon, IconNames } from '../components/Icon';

type ToastType = 'error' | 'info' | 'success';

const TOAST_CONFIG = {
  error: { name: IconNames.ERROR, color: '#e74c3c', duration: 5000, toastId: 1 },
  info: { name: IconNames.INFO, color: '#2980b9', duration: 5000, toastId: 2 },
  success: { name: IconNames.CIRCLE_CHECK, color: '#27ae60', duration: 3000, toastId: 3 },
};

export const useToast = (type: ToastType) => {
  const config = TOAST_CONFIG[type];

  const icon = useMemo(() => {
    return <Icon name={config.name} color={config.color} opacity={1} size={20} />;
  }, [type]);

  const options: ToastOptions = {
    type,
    icon,
    autoClose: config.duration,
    progressStyle: {
      background: config.color,
    },
    toastId: config.toastId, // set to avoid stacking of the same type
    position: 'bottom-right',
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
    newestOnTop: true,
    draggable: true,
    toastStyle: {
      fontFamily: theme.font,
      background: theme.backgroundColor.primary,
      color: theme.color.faint,
    },
  };
};
