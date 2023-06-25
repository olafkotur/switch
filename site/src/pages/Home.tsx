import React, { ReactElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { DemoDark, DemoLight, Download, LargeText, Spacer, VeryLargeText } from '../components';
import { MAX_PAGE_WIDTH } from '../const';
import { ThemeState } from '../state';

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Banner = styled.img`
  width: 90vw;
  max-width: ${MAX_PAGE_WIDTH}px;
  user-select: none;
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
      <LargeText faint>
        Seamlessly transition between contexts without disrupting your workflow. Crafted with passion for individuals
        who value efficiency
      </LargeText>
      <Spacer vertical={15} />

      <Download expanded />
      <Spacer vertical={15} />

      <Banner src={demo} />
    </HomePageContainer>
  );
};
