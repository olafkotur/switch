import { HTMLMotionProps, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ScaleOnTap } from '../style/animations';

const ICON_BUTTON_SIZES = {
  small: '12px',
  medium: '21px',
  large: '30px',
};

interface Props extends HTMLMotionProps<'div'> {
  disabled?: boolean;
  width?: string;
  bg?: string;
}

interface IconButtonProps extends Props {
  size: keyof typeof ICON_BUTTON_SIZES;
  noMargin?: boolean;
  bg?: string;
}

const ButtonContainer = styled(motion.div)<{ disabled?: boolean }>`
  cursor: pointer;
  user-select: none;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

export const Button = ({ ...props }: Props): ReactElement => {
  return <ButtonContainer {...props} {...ScaleOnTap({})} />;
};

const IconButtonContainer = styled(Button)<{ px: string; noMargin?: boolean; bg?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.px};
  height: ${(props) => props.px};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: ${(props) => (props.noMargin ? 0 : props.theme.spacing.medium)};
  background: ${(props) => props.bg};
`;

export const IconButton = ({ ...props }: IconButtonProps): ReactElement => {
  return (
    <IconButtonContainer {...props} px={ICON_BUTTON_SIZES[props.size]}>
      {props.children}
    </IconButtonContainer>
  );
};

const LargeButtonContainer = styled(Button)<{ bg?: string }>`
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: center;
  width: ${(props) => props.width ?? '110px'};
  background: ${(props) => props.bg ?? props.theme.color.normal};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

export const LargeButton = ({ ...props }: Props): ReactElement => {
  return <LargeButtonContainer {...props}>{props.children}</LargeButtonContainer>;
};
