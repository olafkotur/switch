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

const CommandKey = (): ReactElement => {
  const theme = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
      <g transform="translate(9007 1707)">
        <rect width="37" height="37" rx="5" transform="translate(-9007 -1707)" fill={theme.backgroundColor.tertiary} />
        <path
          d="M429.334,127.726h.54a.81.81,0,0,0,.112.027,3.313,3.313,0,0,1,2.029.946,3.225,3.225,0,0,1,1.033,2.178c.037.616.024,1.236.033,1.854,0,.059,0,.117,0,.174h3.444c0-.328-.008-.648,0-.967a9.685,9.685,0,0,1,.071-1.343,3.288,3.288,0,0,1,2.166-2.631,7.31,7.31,0,0,1,.935-.237h.54c.048.01.1.025.145.03a3.447,3.447,0,0,1-.029,6.852c-.629.069-1.269.029-1.9.039h-.179v3.443c.553,0,1.093-.008,1.632,0a4.3,4.3,0,0,1,.786.077,3.452,3.452,0,0,1,.552,6.6,8.05,8.05,0,0,1-1,.245h-.54a.517.517,0,0,0-.094-.028,3.324,3.324,0,0,1-2.025-.956,3.222,3.222,0,0,1-1.021-2.166c-.037-.616-.024-1.236-.033-1.854,0-.059,0-.118,0-.174h-3.444v.192c0,.495,0,.99,0,1.485a3.449,3.449,0,0,1-2.253,3.273,7.69,7.69,0,0,1-.954.227h-.54c-.048-.011-.1-.026-.145-.032a3.448,3.448,0,0,1,.062-6.849c.628-.07,1.269-.03,1.9-.039h.181v-3.443c-.552,0-1.092.008-1.632,0a4.316,4.316,0,0,1-.786-.076,3.452,3.452,0,0,1-.553-6.6A8.21,8.21,0,0,1,429.334,127.726Zm3.755,10.352h3.423v-3.422h-3.423Zm5.17-5.176a.63.63,0,0,0,.08.012c.607,0,1.216.019,1.821-.022a1.71,1.71,0,0,0,1.505-2.12,1.741,1.741,0,0,0-1.914-1.294,1.721,1.721,0,0,0-1.467,1.5c-.027.437-.019.876-.024,1.314C438.257,132.5,438.259,132.7,438.259,132.9Zm-6.911,6.922c-.6,0-1.174-.01-1.747,0a1.735,1.735,0,0,0-1.674,2.089,1.757,1.757,0,0,0,1.675,1.37,1.719,1.719,0,0,0,1.681-1.313,5.878,5.878,0,0,0,.063-1.055C431.356,140.559,431.348,140.2,431.348,139.824Zm0-7.848h-.018c0-.326.019-.652,0-.976a1.718,1.718,0,0,0-3.415-.035,1.7,1.7,0,0,0,1.544,1.929c.588.033,1.179.014,1.769.022.1,0,.126-.037.124-.13C431.346,132.515,431.348,132.245,431.348,131.976ZM439.2,139.8l0,.025c-.259,0-.517.006-.776,0-.124,0-.166.031-.164.16.007.5,0,1,0,1.5a2.088,2.088,0,0,0,.04.418,1.712,1.712,0,0,0,2.769.988,1.709,1.709,0,0,0-.668-3A7.906,7.906,0,0,0,439.2,139.8Z"
          transform="translate(-9423.305 -1824.868)"
          fill={theme.color.inverted}
        />
      </g>
    </svg>
  );
};

const EscapeKey = (): ReactElement => {
  const theme = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
      <g transform="translate(8790 1707)">
        <rect width="37" height="37" rx="5" transform="translate(-8790 -1707)" fill={theme.backgroundColor.tertiary} />
        <path
          d="M3.4.117A3.181,3.181,0,0,1,1.807-.26,2.55,2.55,0,0,1,.781-1.33,3.526,3.526,0,0,1,.422-2.973,3.507,3.507,0,0,1,.781-4.6a2.652,2.652,0,0,1,1.014-1.09,2.942,2.942,0,0,1,1.537-.391,3.176,3.176,0,0,1,1.107.189,2.5,2.5,0,0,1,.9.568,2.589,2.589,0,0,1,.6.951,3.8,3.8,0,0,1,.215,1.338v.457H1.086V-3.605h3.5a1.275,1.275,0,0,0-.156-.637A1.137,1.137,0,0,0,4-4.678a1.259,1.259,0,0,0-.639-.158,1.281,1.281,0,0,0-.67.174,1.247,1.247,0,0,0-.455.465,1.324,1.324,0,0,0-.168.646v.98a1.669,1.669,0,0,0,.166.77,1.188,1.188,0,0,0,.471.5,1.422,1.422,0,0,0,.723.176A1.574,1.574,0,0,0,3.934-1.2a1.054,1.054,0,0,0,.395-.234,1.019,1.019,0,0,0,.25-.383l1.539.1a2.1,2.1,0,0,1-.479.967,2.4,2.4,0,0,1-.93.641A3.494,3.494,0,0,1,3.4.117ZM12.23-4.289,10.707-4.2a.8.8,0,0,0-.168-.354A.922.922,0,0,0,10.2-4.8a1.188,1.188,0,0,0-.5-.1,1.231,1.231,0,0,0-.652.162.489.489,0,0,0-.266.432.462.462,0,0,0,.172.363,1.364,1.364,0,0,0,.59.238l1.086.219a2.692,2.692,0,0,1,1.3.578,1.361,1.361,0,0,1,.43,1.047,1.64,1.64,0,0,1-.346,1.035,2.258,2.258,0,0,1-.945.693A3.589,3.589,0,0,1,9.7.117a3.229,3.229,0,0,1-1.9-.5,1.924,1.924,0,0,1-.826-1.357l1.637-.086a.834.834,0,0,0,.359.553,1.3,1.3,0,0,0,.73.189,1.3,1.3,0,0,0,.705-.17.516.516,0,0,0,.271-.439.465.465,0,0,0-.191-.373,1.394,1.394,0,0,0-.578-.225L8.867-2.5a2.477,2.477,0,0,1-1.307-.609,1.508,1.508,0,0,1-.428-1.105,1.61,1.61,0,0,1,.314-1,2,2,0,0,1,.887-.645,3.634,3.634,0,0,1,1.342-.227,2.969,2.969,0,0,1,1.791.48A1.858,1.858,0,0,1,12.23-4.289Zm3.9,4.406a3.051,3.051,0,0,1-1.584-.393,2.611,2.611,0,0,1-1.016-1.092,3.52,3.52,0,0,1-.354-1.609A3.5,3.5,0,0,1,13.533-4.6a2.643,2.643,0,0,1,1.018-1.09,3.016,3.016,0,0,1,1.57-.393,3.125,3.125,0,0,1,1.375.285,2.3,2.3,0,0,1,.934.8,2.353,2.353,0,0,1,.379,1.211h-1.57a1.227,1.227,0,0,0-.35-.725,1.017,1.017,0,0,0-.74-.275,1.114,1.114,0,0,0-.674.209,1.349,1.349,0,0,0-.447.607,2.589,2.589,0,0,0-.16.965,2.674,2.674,0,0,0,.158.977,1.342,1.342,0,0,0,.447.613,1.116,1.116,0,0,0,.676.211,1.109,1.109,0,0,0,.514-.117,1,1,0,0,0,.379-.342,1.3,1.3,0,0,0,.2-.541h1.57A2.459,2.459,0,0,1,18.436-.99a2.274,2.274,0,0,1-.92.814A3.067,3.067,0,0,1,16.129.117Z"
          transform="translate(-8781.422 -1685.922)"
          fill={theme.color.inverted}
        />
      </g>
    </svg>
  );
};

export { Bg, CommandKey, EscapeKey, Switch, SwitchIcon };
