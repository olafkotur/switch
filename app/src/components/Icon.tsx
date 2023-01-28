import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { DEFAULT_ICON_SIZE } from '../const';
import { useTheme } from '../hooks';

interface IconProps {
  name: IconNames;
  color?: string;
  size?: number;
}

export enum IconNames {
  SETTINGS = 'fa-solid fa-gear',
  ADD = 'fa-solid fa-plus',
  BACK = 'fa-solid fa-arrow-left',
  FORWARD = 'fa-solid fa-arrow-right',
  RELOAD = 'fa-solid fa-rotate-right',
  DELETE = 'fa-solid fa-trash',
  SEARCH = 'fa-solid fa-magnifying-glass',
  CLOSE = 'fa-solid fa-xmark',
}

const IconContainer = styled.div<{ size: number; color: string }>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
`;

export const Icon = ({ name, color, size }: IconProps): ReactElement => {
  const theme = useTheme();

  return (
    <IconContainer color={color ?? theme.color.normal} size={size ?? DEFAULT_ICON_SIZE}>
      <FontAwesomeIcon icon={name as unknown as IconProp} />
    </IconContainer>
  );
};

library.add(
  Icons.faGear,
  Icons.faPlus,
  Icons.faArrowLeft,
  Icons.faArrowRight,
  Icons.faRotateRight,
  Icons.faTrash,
  Icons.faMagnifyingGlass,
  Icons.faClose,
);
