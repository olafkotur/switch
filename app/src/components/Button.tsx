import React, { ReactElement } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import styled from 'styled-components';

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

const IconButtonContainer = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${(props) => props.theme.backgroundColor.tertiary};
`;

export const IconButton = ({ ...props }: Props): ReactElement => {
  return (
    <IconButtonContainer {...props}>
      <span>Icon</span>
    </IconButtonContainer>
  );
};
