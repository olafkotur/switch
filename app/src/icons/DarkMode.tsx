import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const DarkMode = ({
  color,
  size = DEFAULT_ICON_SIZE,
  opacity = DEFAULT_ICON_OPACITY,
}: IconProps): ReactElement => {
  const defaultColor = useDefaultColor();
  const fill = color ?? defaultColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      fill={fill}
      opacity={opacity}
    >
      <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025.337.025.662.075-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613 1.15-.612 1.875-1.637.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Z" />
    </svg>
  );
};