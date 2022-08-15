import React, { ReactElement } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import styled from 'styled-components';
import { SvgIcon } from '../assets/svg-icon';

interface Props extends HTMLMotionProps<'div'> {}

const Button = ({ ...props }: Props): ReactElement => {
  return (
    <motion.div
      {...props}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    />
  );
};

const ICON_BUTTON_SIZES = {
  small: '12px',
  medium: '24px',
  large: '38px',
};

const IconButtonContainer = styled(Button)<{ px: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ px }) => px};
  height: ${({ px }) => px};
  background: ${(props) => props.theme.backgroundColor.tertiary};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

interface IconButtonProps extends Props {
  size: keyof typeof ICON_BUTTON_SIZES;
}

export const IconButton = ({ ...props }: IconButtonProps): ReactElement => {
  return (
    <IconButtonContainer {...props} px={ICON_BUTTON_SIZES[props.size]}>
      <SvgIcon name="test" />
    </IconButtonContainer>
  );
};
