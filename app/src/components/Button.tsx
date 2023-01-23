import { HTMLMotionProps, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ICON_BUTTON_SIZES = {
  small: '12px',
  medium: '21px',
  large: '38px',
};

interface Props extends HTMLMotionProps<'div'> {}

interface IconButtonProps extends Props {
  size: keyof typeof ICON_BUTTON_SIZES;
}

export const Button = ({ ...props }: Props): ReactElement => {
  return <motion.div {...props} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />;
};

const IconButtonContainer = styled(Button)<{ px: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.px};
  height: ${(props) => props.px};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: ${(props) => props.theme.spacing.medium} 0;
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
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 50px;
  background: ${(props) => props.theme.color.normal};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

export const LargeButton = ({ ...props }: Props): ReactElement => {
  return <LargeButtonContainer>{props.children}</LargeButtonContainer>;
};
