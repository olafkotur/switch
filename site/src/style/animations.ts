import { HTMLMotionProps } from 'framer-motion';

export const Rotate = ({
  repeat = Infinity,
  duration = 1,
  degrees = 360,
}: {
  repeat?: number;
  duration?: number;
  degrees?: number;
}): HTMLMotionProps<'div'> => {
  return {
    initial: { rotate: 0 },
    animate: { rotate: degrees },
    transition: { type: 'keyframes', repeat, duration },
  };
};

export const ScaleOnTap = ({ depth = 0.97 }: { depth?: number }): HTMLMotionProps<'div'> => {
  return {
    whileTap: { scale: depth },
  };
};

export const Visibility = ({
  isVisible,
  display = 'flex',
}: {
  isVisible: boolean;
  display?: string;
}): HTMLMotionProps<'div'> => {
  return {
    initial: { display: 'none' },
    animate: { display: isVisible ? display : 'none' },
  };
};

export const ChangeColor = ({
  color,
  duration = 0.25,
}: {
  color: string;
  duration?: number;
}): HTMLMotionProps<'div'> => {
  return {
    animate: { color },
    transition: { duration },
  };
};

export const Fade = ({ duration = 0.15 }: { duration?: number }): HTMLMotionProps<'div'> => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration },
  };
};

export const Slide = ({ width, duration = 0.2 }: { width: string; duration?: number }): HTMLMotionProps<'div'> => {
  return {
    initial: { right: `-${width}`, display: 'none' },
    animate: { right: 0, display: '' },
    exit: { right: `-${width}`, display: 'none' },
    transition: { duration },
  };
};
