import React, { ReactElement } from 'react';
import styled from 'styled-components';

type SvgIconName = 'test';

const SvgIconContainer = styled.div``;

interface Props {
  name: SvgIconName;
}
export const SvgIcon = ({ name }: Props): ReactElement => {
  return <SvgIconContainer>{SVG_ICONS[name]}</SvgIconContainer>;
};

const SVG_ICONS: Record<SvgIconName, ReactElement> = {
  test: (
    <svg
      id="Group_19"
      data-name="Group 19"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="21.076"
      height="21.103"
      viewBox="0 0 21.076 21.103"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_41"
            data-name="Rectangle 41"
            width="21.076"
            height="21.103"
            fill="red"
          />
        </clipPath>
      </defs>
      <g id="Group_18" data-name="Group 18" clipPath="url(#clip-path)">
        <path
          id="Path_11"
          data-name="Path 11"
          d="M10.52,21.1A10.553,10.553,0,0,1,8.913.125c.4-.062.8-.082,1.2-.12A.506.506,0,0,1,10.7.3c.1.253-.034.433-.219.6A6.96,6.96,0,0,0,8.163,5.091a6.873,6.873,0,0,0,5.306,7.736,6.754,6.754,0,0,0,6.545-2.045c.08-.082.16-.165.235-.251a.465.465,0,0,1,.827.339,9.488,9.488,0,0,1-.428,2.648A10.434,10.434,0,0,1,12.2,20.957a4.489,4.489,0,0,1-.511.066c-.39.03-.78.053-1.17.079"
          transform="translate(0 0)"
          fill="red"
        />
      </g>
    </svg>
  ),
};
