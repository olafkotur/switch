import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';
import { useTheme } from '../hooks';

interface IconProps {
  name: IconNames;
  color?: string;
  size?: number;
  opacity?: number;
  animation?: HTMLMotionProps<'div'>;
}

export enum IconNames {
  TREE = 'fa-solid fa-tree',
  ADD = 'fa-solid fa-plus',
  COINS = 'fa-solid fa-coins',
  CHEVRON_UP = 'fa-solid fa-chevron-up',
  CHEVRON_RIGHT = 'fa-solid fa-chevron-right',
  CHEVRON_DOWN = 'fa-solid fa-chevron-down',
  CHEVRON_LEFT = 'fa-solid fa-chevron-left',
  TERMINAL = 'fa-solid fa-terminal',
  MOON = 'fa-solid fa-moon',
  SUN = 'fa-solid fa-sun',
  INFO = 'fa-solid fa-circle-info',
  LEAF = 'fa-solid fa-leaf',
  PERCENT = 'fa-solid fa-percent',
  GEAR = 'fa-solid fa-gear',
  TAG = 'fa-solid fa-hashtag',
  LABEL = 'fa-solid fa-tag',
  CHART = 'fa-solid fa-chart-simple',
  WARNING = 'fa-solid fa-triangle-exclamation',
  CLOSE = 'fa-solid fa-xmark',
  CIRCLE_CHECK = 'fa-regular fa-circle-check',
  ERROR = 'fa-solid fa-circle-exclamation',
  ARROW_LEFT_RIGHT = 'fa-solid fa-arrows-left-right',
  CIRCLE_FILLED = 'fa-solid fa-circle',
  CIRCLE_EMPTY = 'fa-regular fa-circle',
  DOLLAR = 'fa-solid fa-dollar-sign',
  SEARCH = 'fa-solid fa-magnifying-glass',
  WALLET = 'fa-solid fa-wallet',
  SQUARE = 'fa-regular fa-square',
  SQUARE_CHECK = 'fa-solid fa-square-check',
  CODE_BRANCH = 'fa-solid fa-code-branch',
  GAUGE = 'fa-solid fa-gauge-high',
  LOADING = 'fa-solid fa-circle-notch',
  USER = 'fa-solid fa-user',
  KEY = 'fa-solid fa-key',
}

const IconContainer = styled(motion.div)<{ size: number; color: string; opacity: number }>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
  opacity: ${(props) => props.opacity};
`;

export const Icon = ({ name, color, size, opacity, animation }: IconProps): ReactElement => {
  const theme = useTheme();

  return (
    <IconContainer
      {...animation}
      color={color ?? theme.color.normal}
      size={size ?? DEFAULT_ICON_SIZE}
      opacity={opacity ?? DEFAULT_ICON_OPACITY}
    >
      <FontAwesomeIcon icon={name as unknown as IconProp} />
    </IconContainer>
  );
};

library.add(
  Solid.faTree,
  Solid.faPlus,
  Solid.faCoins,
  Solid.faChevronUp,
  Solid.faChevronRight,
  Solid.faChevronDown,
  Solid.faChevronLeft,
  Solid.faTerminal,
  Solid.faMoon,
  Solid.faSun,
  Solid.faCircleInfo,
  Solid.faLeaf,
  Solid.faPercent,
  Solid.faGear,
  Solid.faHashtag,
  Solid.faTag,
  Solid.faChartSimple,
  Solid.faTriangleExclamation,
  Solid.faXmark,
  Solid.faCircleCheck,
  Solid.faCircleExclamation,
  Solid.faArrowsLeftRight,
  Solid.faCircle,
  Solid.faDollarSign,
  Solid.faMagnifyingGlass,
  Solid.faWallet,
  Solid.faSquareCheck,
  Solid.faCodeBranch,
  Solid.faGaugeHigh,
  Solid.faCircleNotch,
  Solid.faUser,
  Solid.faKey,
  Regular.faCircle,
  Regular.faCircleCheck,
  Regular.faSquare,
);
