import React, { ReactElement } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import styled from 'styled-components';
import { SvgIcon, SvgIconName } from './SvgIcon';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ActiveModuleIdState, ThemeState } from '../state';
import { Module } from '../../../common/types/module';

interface Props extends HTMLMotionProps<'div'> {}

export const Button = ({ ...props }: Props): ReactElement => {
  return <motion.div {...props} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} />;
};

const ICON_BUTTON_SIZES = {
  small: '12px',
  medium: '21px',
  large: '38px',
};

const IconButtonContainer = styled(Button)<{ px: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ px }) => px};
  height: ${({ px }) => px};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: ${(props) => props.theme.spacing.large} 0;
`;

interface IconButtonProps extends Props {
  name: SvgIconName;
  size: keyof typeof ICON_BUTTON_SIZES;
}

export const IconButton = ({ ...props }: IconButtonProps): ReactElement => {
  return (
    <IconButtonContainer {...props} px={ICON_BUTTON_SIZES[props.size]}>
      <SvgIcon name={props.name} />
    </IconButtonContainer>
  );
};

const ModuleButtonContainer = styled(Button)<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: ${(props) => props.theme.spacing.small} 0;
  background: ${({ background }) => background};
`;

interface ModuleButtonProps {
  module: Module;
}

export const ModuleButton = ({ module }: ModuleButtonProps): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useRecoilValue(ThemeState);

  const isActive = module.id === activeModuleId;
  const background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <ModuleButtonContainer
      onClick={() => setActiveModuleId(module.id)}
      background={isActive ? background : undefined}
    >
      <img src={module.favicon} width="26px" />
    </ModuleButtonContainer>
  );
};
