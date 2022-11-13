import { HTMLMotionProps, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Icon, IconName } from './Icon';

const ICON_BUTTON_SIZES = {
  small: '12px',
  medium: '21px',
  large: '38px',
};

interface Props extends HTMLMotionProps<'div'> {}

interface IconButtonProps extends Props {
  name: IconName;
  size: keyof typeof ICON_BUTTON_SIZES;
}

export const Button = ({ ...props }: Props): ReactElement => {
  return <motion.div {...props} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} />;
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

export const IconButton = ({ ...props }: IconButtonProps): ReactElement => {
  return (
    <IconButtonContainer {...props} px={ICON_BUTTON_SIZES[props.size]}>
      <Icon name={props.name} />
    </IconButtonContainer>
  );
};
