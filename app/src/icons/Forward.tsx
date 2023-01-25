import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const Forward = ({
  color,
  size = DEFAULT_ICON_SIZE,
  opacity = DEFAULT_ICON_OPACITY,
}: IconProps): ReactElement => {
  const defaultColor = useDefaultColor();
  const fill = color ?? defaultColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} opacity={opacity}>
      <path d="m10 16-1.062-1.062 4.187-4.188H4v-1.5h9.125L8.938 5.062 10 4l6 6Z" />
    </svg>
  );
};
