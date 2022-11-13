import { motion } from 'framer-motion';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';

const AlertContainer = styled(motion.div)`
  right: 0;
  width: 200px;
  position: absolute;
  padding: ${(props) => props.theme.spacing.medium};
  margin: ${(props) => `${props.theme.spacing.large} ${props.theme.spacing.large} 0 0`};
  background: blue;
`;

const DismissIconContainer = styled.div``;

export const Alerts = (): ReactElement => {
  // TODO: add stackable alerts
  const [alerts, setAlerts] = useState<string[]>([]);

  return (
    <AlertContainer>
      <DismissIconContainer>
        <Icon name="close" />
      </DismissIconContainer>
    </AlertContainer>
  );
};
