import React, { ReactElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { LargeText, Spacer, VeryLargeText, Download, DemoDark, DemoLight } from '../components';
import { ThemeState } from '../state';

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Banner = styled.img`
  width: 90vw;
  max-width: 1024px;
`;

export const HomePage = (): ReactElement => {
  const theme = useRecoilValue(ThemeState);

  const demo = useMemo(() => {
    return theme === 'dark' ? DemoDark : DemoLight;
  }, [theme]);

  return (
    <HomePageContainer>
      <Spacer vertical={20} />
      <VeryLargeText>Lightweight Browser</VeryLargeText>
      <Spacer vertical={5} />
      <LargeText faint>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</LargeText>
      <Spacer vertical={15} />

      <Download expanded />
      <Spacer vertical={15} />

      <Banner src={demo} />
    </HomePageContainer>
  );
};
