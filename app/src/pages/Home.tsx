import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { SearchBar, SwitchHeader } from '../components';
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

const Header = styled.img`
  margin-bottom: 75px;
`;

export const HomePage = (): ReactElement => {
  const [searchValue, setSearchValue] = useState('');

  const createModule = useCreateModule();

  return (
    <HomeContainer>
      <Header src={SwitchHeader} />
      <SearchBar value={searchValue} setValue={setSearchValue} onSubmit={createModule} />
    </HomeContainer>
  );
};
