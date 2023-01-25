import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const Back = ({ color, size = DEFAULT_ICON_SIZE, opacity = DEFAULT_ICON_OPACITY }: IconProps): ReactElement => {
  const defaultColor = useDefaultColor();
  const fill = color ?? defaultColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} opacity={opacity}>
      <path d="m10 16-6-6 6-6 1.062 1.062L6.875 9.25H16v1.5H6.875l4.187 4.188Z" />
    </svg>
  );
};
