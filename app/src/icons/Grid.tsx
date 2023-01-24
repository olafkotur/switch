import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const Grid = ({
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
      <path d="M3 11V3h8v8Zm0 10v-8h8v8Zm10-10V3h8v8Zm0 10v-8h8v8Z" />
    </svg>
  );
};
