import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Switch } from './Asset';
import { Spacer } from './Common';
import { Download } from './Download';
import { VeryLargeText } from './Text';

const HeaderContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 ${(props) => props.theme.spacing.large};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header = (): ReactElement => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Switch />
        <Spacer horizontal={10} />
        <VeryLargeText>Switch</VeryLargeText>
      </LogoContainer>

      <Download />
    </HeaderContainer>
  );
};
