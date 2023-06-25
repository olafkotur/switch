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
  DOWNLOAD = 'fa-solid fa-download',
  CHEVRON_UP = 'fa-solid fa-chevron-up',
  CHEVRON_RIGHT = 'fa-solid fa-chevron-right',
  CHEVRON_DOWN = 'fa-solid fa-chevron-down',
  CHEVRON_LEFT = 'fa-solid fa-chevron-left',
  MOON = 'fa-solid fa-moon',
  SUN = 'fa-solid fa-sun',
  INFO = 'fa-solid fa-circle-info',
  CLOSE = 'fa-solid fa-xmark',
  CIRCLE_CHECK = 'fa-regular fa-circle-check',
  ERROR = 'fa-solid fa-circle-exclamation',
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
  Solid.faDownload,
  Solid.faChevronUp,
  Solid.faChevronRight,
  Solid.faChevronDown,
  Solid.faChevronLeft,
  Solid.faMoon,
  Solid.faSun,
  Solid.faCircleInfo,
  Solid.faXmark,
  Regular.faCircleCheck,
);
