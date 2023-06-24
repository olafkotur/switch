import React, { ReactElement, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useTheme } from '../hooks';
import { ThemeState } from '../state';
import { Switch } from './Asset';
import { IconButton } from './Button';
import { RowContainer, Spacer } from './Common';
import { Download } from './Download';
import { Icon, IconNames } from './Icon';
import { MediumText, VeryLargeText } from './Text';

const HeaderContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 ${(props) => props.theme.spacing.large};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BetaText = styled(MediumText)`
  display: flex;
  align-items: center;
  height: 30px;
  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.highlightColor.quaternary};
  border-radius: ${(props) => props.theme.borderRadius.small};
  padding: 0 ${(props) => props.theme.spacing.medium};
`;

export const Header = (): ReactElement => {
  const theme = useTheme();
  const setTheme = useSetRecoilState(ThemeState);

  const handleToggleTheme = useCallback(() => {
    if (theme.name === 'dark') {
      return setTheme('light');
    }
    setTheme('dark');
  }, [theme.name, setTheme]);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Switch />
        <Spacer horizontal={10} />
        <VeryLargeText>Switch</VeryLargeText>
      </LogoContainer>

      <RowContainer>
        <IconButton size="large" bg={theme.backgroundColor.primary} onClick={handleToggleTheme}>
          <Icon name={theme.name === 'dark' ? IconNames.SUN : IconNames.MOON} />
        </IconButton>

        <BetaText bold>Private Beta</BetaText>
      </RowContainer>
    </HeaderContainer>
  );
};
