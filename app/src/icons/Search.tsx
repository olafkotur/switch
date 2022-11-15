import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../../../common/const';

export const Search = ({
  color,
  size = DEFAULT_ICON_SIZE,
  opacity = DEFAULT_ICON_OPACITY,
}: IconProps): ReactElement => {
  const defaultColor = useDefaultColor();
  const fill = color ?? defaultColor;

  return (
    <svg viewBox="0 0 20 20" height={size} width={size} fill={fill} opacity={opacity}>
      <path
        id="Shape"
        d="M8,16a8,8,0,1,1,8-8A8.009,8.009,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6.007,6.007,0,0,0,8,2Z"
        fill="#fff"
      />
      <path
        id="Path"
        d="M.293.293a1,1,0,0,1,1.414,0l6,6A1,1,0,0,1,6.293,7.707l-6-6A1,1,0,0,1,.293.293Z"
        transform="translate(12 12)"
        fill="#fff"
      />
    </svg>
  );
};
