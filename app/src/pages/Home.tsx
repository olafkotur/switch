import React, { ReactElement, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Header, SearchBar, Spacer, Suggestions } from '../components';
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

const SuggestionsContainer = styled.div`
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

  const suggestionGroups = useMemo(() => {
    return {
      productivity: suggestions.filter((suggestion) => suggestion.category === 'productivity'),
      social: suggestions.filter((suggestion) => suggestion.category === 'social'),
      messaging: suggestions.filter((suggestion) => suggestion.category === 'messaging'),
    };
  }, [suggestions]);

  const isSearchValueValid = useMemo(() => {
    const regex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:[\.|\:][\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
    return searchValue !== '' && regex.test(searchValue);
  }, [searchValue]);

  return (
    <HomeContainer>
      <Header />
      <Spacer vertical={40} />
      <SearchBar value={searchValue} isValid={isSearchValueValid} setValue={setSearchValue} onSubmit={createModule} />

      <Spacer vertical={20} />

      <SuggestionsContainer className="my-first-step">
        <Suggestions title="Productivity" data={suggestionGroups.productivity} />
        <Suggestions title="Social" data={suggestionGroups.social} />
        <Suggestions title="Messaging" data={suggestionGroups.messaging} />
      </SuggestionsContainer>
    </HomeContainer>
  );
};
