import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const Add = ({ color, size = DEFAULT_ICON_SIZE, opacity = DEFAULT_ICON_OPACITY }: IconProps): ReactElement => {
  const defaultColor = useDefaultColor();
  const fill = color ?? defaultColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} opacity={opacity}>
      <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
    </svg>
  );
};
