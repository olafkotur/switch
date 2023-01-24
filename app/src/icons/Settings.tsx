import React, { ReactElement } from 'react';
import { IconProps, useDefaultColor } from '.';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';

export const Settings = ({
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
      <path d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Z" />
    </svg>
  );
};
