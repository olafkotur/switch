import React, { ReactElement, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Header, ModuleGroup, SearchBar, Spacer } from '../components';
import { SIDE_BAR_WIDTH } from '../const';
import { useCreateModule } from '../hooks';
import { SuggestionsState } from '../state';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 1300px;
  overflow-y: scroll;
  width: calc(100vw - ${SIDE_BAR_WIDTH}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH}px;
`;

const ModuleGroupContaner = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(70% + 20px);
  position: relative;
  justify-content: space-between;
`;

export const HomePage = (): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const suggestions = useRecoilValue(SuggestionsState);
  const createModule = useCreateModule();

  const productivity = suggestions.filter((suggestion) => suggestion.category === 'productivity');
  const social = suggestions.filter((suggestion) => suggestion.category === 'social');
  const messaging = suggestions.filter((suggestion) => suggestion.category === 'messaging');

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

      <Spacer vertical={20} />

      <ModuleGroupContaner>
        <ModuleGroup title="Productivity" data={productivity} />
        <ModuleGroup title="Social" data={social} />
        <ModuleGroup title="Messaging" data={messaging} />
      </ModuleGroupContaner>
    </HomeContainer>
  );
};
