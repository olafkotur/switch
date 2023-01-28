import React, { ReactElement } from 'react';
import { useTheme } from '../hooks';

const Bg = require('../../assets/bg.png');
const SwitchIcon = require('../../assets/switch-icon.png');

const Switch = (): ReactElement => {
  const theme = useTheme();
  const defaultColor = theme.color.normal;
  const size = 6.5;
  const opacity = 1;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33.135" height="33.135" viewBox="0 0 33.135 33.135">
      <g id="Group_4" data-name="Group 4" transform="translate(-257.635 -1042.635)">
        <rect
          id="Rectangle_1"
          data-name="Rectangle 1"
          width={size}
          height={size}
          transform="translate(266.573 1042.635)"
          fill="#b33939"
          opacity={opacity}
        />
        <rect
          id="Rectangle_2"
          data-name="Rectangle 2"
          width={size}
          height={size}
          transform="translate(284.394 1042.635)"
          fill={defaultColor}
          opacity={opacity}
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width={size}
          height={size}
          transform="translate(275.455 1051.573)"
          fill={defaultColor}
          opacity={opacity}
        />
        <rect
          id="Rectangle_6"
          data-name="Rectangle 6"
          width={size}
          height={size}
          transform="translate(257.635 1051.573)"
          fill={defaultColor}
          opacity={opacity}
        />
        <rect
          id="Rectangle_8"
          data-name="Rectangle 8"
          width={size}
          height={size}
          transform="translate(266.573 1060.455)"
          fill={defaultColor}
          opacity={opacity}
        />
        <rect
          id="Rectangle_12"
          data-name="Rectangle 12"
          width={size}
          height={size}
          transform="translate(266.573 1069.393)"
          fill={'#b33939'}
          opacity={opacity}
        />
        <rect
          id="Rectangle_11"
          data-name="Rectangle 11"
          width={size}
          height={size}
          transform="translate(275.455 1069.393)"
          fill="#307093"
          opacity={opacity}
        />
        <rect
          id="Rectangle_10"
          data-name="Rectangle 10"
          width={size}
          height={size}
          transform="translate(284.394 1060.455)"
          fill={defaultColor}
          opacity={opacity}
        />
        <rect
          id="Rectangle_3"
          data-name="Rectangle 3"
          width={size}
          height={size}
          transform="translate(284.394 1051.573)"
          fill={'#307093'}
          opacity={opacity}
        />
        <rect
          id="Rectangle_7"
          data-name="Rectangle 7"
          width={size}
          height={size}
          transform="translate(257.635 1060.455)"
          fill={'#cbae61'}
          opacity={opacity}
        />
        <rect
          id="Rectangle_9"
          data-name="Rectangle 9"
          width={size}
          height={size}
          transform="translate(275.455 1060.455)"
          fill={'#cbae61'}
          opacity={opacity}
        />
      </g>
    </svg>
  );
};

export { Bg, SwitchIcon, Switch };
