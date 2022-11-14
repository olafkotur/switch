import React, { ReactElement, useEffect, useState } from 'react';

const COLOR = 'rgba(255, 255, 255, 0.75)';

export const Switch = ({ isActive }: { isActive?: boolean }): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33.135"
      height="33.135"
      viewBox="0 0 33.135 33.135"
    >
      <g id="Group_4" data-name="Group 4" transform="translate(-257.635 -1042.635)">
        <rect
          id="Rectangle_1"
          data-name="Rectangle 1"
          width="6.376"
          height="6.376"
          transform="translate(266.573 1042.635)"
          fill={isActive ? COLOR : '#b33939'}
        />
        <rect
          id="Rectangle_2"
          data-name="Rectangle 2"
          width="6.376"
          height="6.376"
          transform="translate(284.394 1042.635)"
          fill={isActive ? COLOR : '#fff'}
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width="6.376"
          height="6.376"
          transform="translate(275.455 1051.573)"
          fill={isActive ? COLOR : '#fff'}
        />
        <rect
          id="Rectangle_6"
          data-name="Rectangle 6"
          width="6.376"
          height="6.376"
          transform="translate(257.635 1051.573)"
          fill={isActive ? COLOR : '#fff'}
        />
        <rect
          id="Rectangle_8"
          data-name="Rectangle 8"
          width="6.376"
          height="6.376"
          transform="translate(266.573 1060.455)"
          fill={isActive ? COLOR : '#fff'}
        />
        <rect
          id="Rectangle_12"
          data-name="Rectangle 12"
          width="6.376"
          height="6.376"
          transform="translate(266.573 1069.393)"
          fill={isActive ? COLOR : '#b33939'}
        />
        <rect
          id="Rectangle_11"
          data-name="Rectangle 11"
          width="6.376"
          height="6.376"
          transform="translate(275.455 1069.393)"
          fill={isActive ? COLOR : '#307093'}
        />
        <rect
          id="Rectangle_10"
          data-name="Rectangle 10"
          width="6.376"
          height="6.376"
          transform="translate(284.394 1060.455)"
          fill={isActive ? COLOR : '#fff'}
        />
        <rect
          id="Rectangle_3"
          data-name="Rectangle 3"
          width="6.376"
          height="6.376"
          transform="translate(284.394 1051.573)"
          fill={isActive ? COLOR : '#307093'}
        />
        <rect
          id="Rectangle_7"
          data-name="Rectangle 7"
          width="6.376"
          height="6.376"
          transform="translate(257.635 1060.455)"
          fill={isActive ? COLOR : '#cbae61'}
        />
        <rect
          id="Rectangle_9"
          data-name="Rectangle 9"
          width="6.376"
          height="6.376"
          transform="translate(275.455 1060.455)"
          fill={isActive ? COLOR : '#cbae61'}
        />
      </g>
    </svg>
  );
};
