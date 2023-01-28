import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { DEFAULT_ICON_OPACITY, DEFAULT_ICON_SIZE } from '../const';
import { useTheme } from '../hooks';
import { HTMLMotionProps, motion } from 'framer-motion';

interface IconProps {
  name: IconNames;
  color?: string;
  size?: number;
  opacity?: number;
  animation?: HTMLMotionProps<'div'>;
}

export enum IconNames {
  SETTINGS = 'fa-solid fa-gear',
  ADD = 'fa-solid fa-plus',
  BACK = 'fa-solid fa-arrow-left',
  FORWARD = 'fa-solid fa-arrow-right',
  RELOAD = 'fa-solid fa-rotate-right',
  DELETE = 'fa-solid fa-trash',
  SEARCH = 'fa-solid fa-magnifying-glass',
  LOGOUT = 'fa-solid fa-arrow-right-from-bracket',
  CHECK = 'fa-regular fa-square-check',
  CHECK_FILLED = 'fa-solid fa-square-check',
  CIRCLE_CHECK = 'fa-regular fa-circle-check',
  ERROR = 'fa-solid fa-circle-exclamation',
  INFO = 'fa-solid fa-circle-info',
  WARNING = 'fa-solid fa-triangle-exclamation',
  LOADING = 'fa-solid fa-circle-notch',
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
  Solid.faGear,
  Solid.faPlus,
  Solid.faArrowLeft,
  Solid.faArrowRight,
  Solid.faRotateRight,
  Solid.faTrash,
  Solid.faMagnifyingGlass,
  Solid.faArrowRightFromBracket,
  Solid.faSquareCheck,
  Solid.faCircleExclamation,
  Solid.faCircleInfo,
  Solid.faTriangleExclamation,
  Solid.faCircleNotch,
  Regular.faSquareCheck,
  Regular.faCircleCheck,
);
