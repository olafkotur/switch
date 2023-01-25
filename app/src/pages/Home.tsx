import React, { ReactElement, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Header, SearchBar, Spacer } from '../components';
import { SIDE_BAR_WIDTH } from '../const';
import { useCreateModule } from '../hooks';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - ${SIDE_BAR_WIDTH}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH}px;
`;

export const HomePage = (): ReactElement => {
  const [searchValue, setSearchValue] = useState('');

  const createModule = useCreateModule();

  const isSearchValueValid = useMemo(() => {
    return new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:[\.|\:][\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm).test(
      searchValue,
    );
  }, [searchValue]);

  return (
    <HomeContainer>
      <Header />
      <Spacer vertical={40} />
      <SearchBar
        value={searchValue}
        disabled={!searchValue || !isSearchValueValid}
        setValue={setSearchValue}
        onSubmit={createModule}
      />
    </HomeContainer>
  );
};
