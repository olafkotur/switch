import { HTMLMotionProps, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ICON_BUTTON_SIZES = {
  small: '12px',
  medium: '21px',
  large: '38px',
};

interface Props extends HTMLMotionProps<'div'> {
  disabled?: boolean;
  width?: string;
  animation?: number;
}

interface IconButtonProps extends Props {
  size: keyof typeof ICON_BUTTON_SIZES;
  noMargin?: boolean;
}

const ButtonContainer = styled(motion.div)`
  cursor: pointer;
`;

export const Button = ({ ...props }: Props): ReactElement => {
  return <ButtonContainer {...props} whileTap={{ scale: props.animation ?? 0.98 }} />;
};

const IconButtonContainer = styled(Button)<{ px: string; noMargin?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.px};
  height: ${(props) => props.px};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: ${(props) => (props.noMargin ? 0 : props.theme.spacing.medium)} 0;
`;

export const IconButton = ({ ...props }: IconButtonProps): ReactElement => {
  return (
    <IconButtonContainer {...props} px={ICON_BUTTON_SIZES[props.size]}>
      {props.children}
    </IconButtonContainer>
  );
};

const LargeButtonContainer = styled(Button)`
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
  width: ${(props) => props.width ?? '110px'};
  background: ${(props) => props.theme.color.normal};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

export const LargeButton = ({ ...props }: Props): ReactElement => {
  return (
    <LargeButtonContainer {...props} width={props.width}>
      {props.children}
    </LargeButtonContainer>
  );
};
