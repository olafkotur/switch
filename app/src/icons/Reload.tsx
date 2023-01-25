import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const Reload = ({
  color,
  size = DEFAULT_ICON_SIZE,
  opacity = DEFAULT_ICON_OPACITY,
}: IconProps): ReactElement => {
  const defaultColor = useDefaultColor();
  const fill = color ?? defaultColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} opacity={opacity}>
      <path d="M10 16q-2.5 0-4.25-1.75T4 10q0-2.5 1.75-4.25T10 4q1.354 0 2.51.562 1.157.563 1.99 1.5V4H16v5h-5V7.5h2.729q-.604-.917-1.583-1.458Q11.167 5.5 10 5.5q-1.875 0-3.188 1.312Q5.5 8.125 5.5 10q0 1.875 1.312 3.188Q8.125 14.5 10 14.5q1.75 0 3-1.156t1.438-2.844h1.541q-.187 2.333-1.896 3.917Q12.375 16 10 16Z" />
    </svg>
  );
};