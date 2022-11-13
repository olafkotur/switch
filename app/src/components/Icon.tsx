import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeState } from '../state';

// TODO: Refactor file to have individual files

export type IconName = 'settings' | 'dark-mode' | 'light-mode' | 'grid' | 'close' | 'switch';

interface Props {
  name: IconName;
  color?: string;
}
export const Icon = ({ name, color }: Props): ReactElement => {
  const theme = useRecoilValue(ThemeState);
  const themeColor = theme === 'dark' ? '#fff' : '#000';
  const fill = color ?? themeColor;

  const SVG_ICONS: Record<IconName, ReactElement> = {
    'dark-mode': (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill={fill}>
        <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025.337.025.662.075-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613 1.15-.612 1.875-1.637.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Z" />
      </svg>
    ),
    'light-mode': (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill={fill}>
        <path d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05 4.575 6q-.3-.275-.288-.7.013-.425.288-.725.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7 0 .4-.275.7-.275.3-.687.287-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712 0-.413.275-.688.275-.3.688-.287.412.012.712.287L19.425 18q.3.275.288.7-.013.425-.288.725-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688.012-.412.287-.712L18 4.575q.275-.3.7-.288.425.013.725.288.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275.412 0 .687.275.3.275.288.688-.013.412-.288.712L6 19.425q-.275.3-.7.287-.425-.012-.725-.287Z" />
      </svg>
    ),
    grid: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill={fill}>
        <path d="M3 11V3h8v8Zm0 10v-8h8v8Zm10-10V3h8v8Zm0 10v-8h8v8Z" />
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill={fill}>
        <path d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Z" />
      </svg>
    ),
    close: (
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill={fill}>
        <path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z" />
      </svg>
    ),
    switch: (
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
            fill="#b33939"
          />
          <rect
            id="Rectangle_2"
            data-name="Rectangle 2"
            width="6.376"
            height="6.376"
            transform="translate(284.394 1042.635)"
            fill="#fff"
          />
          <rect
            id="Rectangle_4"
            data-name="Rectangle 4"
            width="6.376"
            height="6.376"
            transform="translate(275.455 1051.573)"
            fill="#fff"
          />
          <rect
            id="Rectangle_6"
            data-name="Rectangle 6"
            width="6.376"
            height="6.376"
            transform="translate(257.635 1051.573)"
            fill="#fff"
          />
          <rect
            id="Rectangle_8"
            data-name="Rectangle 8"
            width="6.376"
            height="6.376"
            transform="translate(266.573 1060.455)"
            fill="#fff"
          />
          <rect
            id="Rectangle_12"
            data-name="Rectangle 12"
            width="6.376"
            height="6.376"
            transform="translate(266.573 1069.393)"
            fill="#b33939"
          />
          <rect
            id="Rectangle_11"
            data-name="Rectangle 11"
            width="6.376"
            height="6.376"
            transform="translate(275.455 1069.393)"
            fill="#307093"
          />
          <rect
            id="Rectangle_10"
            data-name="Rectangle 10"
            width="6.376"
            height="6.376"
            transform="translate(284.394 1060.455)"
            fill="#fff"
          />
          <rect
            id="Rectangle_3"
            data-name="Rectangle 3"
            width="6.376"
            height="6.376"
            transform="translate(284.394 1051.573)"
            fill="#307093"
          />
          <rect
            id="Rectangle_7"
            data-name="Rectangle 7"
            width="6.376"
            height="6.376"
            transform="translate(257.635 1060.455)"
            fill="#cbae61"
          />
          <rect
            id="Rectangle_9"
            data-name="Rectangle 9"
            width="6.376"
            height="6.376"
            transform="translate(275.455 1060.455)"
            fill="#cbae61"
          />
        </g>
      </svg>
    ),
  };

  return SVG_ICONS[name];
};
