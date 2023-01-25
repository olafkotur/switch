import React, { ReactElement, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton, Input, Spacer } from '../components';
import { SEARCH_BAR_PLACEHOLDER } from '../const';
import { useOnKeyPress, useTheme } from '../hooks';
import { Add, Search } from '../icons';

interface SearchBarProps {
  value: string;
  disabled: boolean;
  setValue: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
}

const SearchBarContainer = styled.div`
  display: flex;
  width: 70%;
  height: 50px;
  background: ${(props) => props.theme.backgroundColor.searchBar};
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.spacing.large};
  color: ${(props) => props.theme.color.inverted};
`;

const SearchBarInput = styled(Input)`
  width: 100%;
  margin-bottom: 2px;
  font-size: 24px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CreateModuleButton = styled(IconButton)`
  align-self: center;
`;

export const SearchBar = ({ value, disabled, setValue, onSubmit }: SearchBarProps): ReactElement => {
  const theme = useTheme();

  useOnKeyPress('Enter', async () => {
    !disabled && (await onSubmit(value));
  });

  return (
    <SearchBarContainer>
      <LeftSection>
        <Spacer horizontal={7} />
        <Search size={24} />
        <Spacer horizontal={7} />
        <SearchBarInput placeholder={SEARCH_BAR_PLACEHOLDER} value={value} onChange={(e) => setValue(e.target.value)} />
        <Spacer horizontal={7} />
      </LeftSection>

      <CreateModuleButton
        noMargin
        size="large"
        onClick={() => onSubmit(value)}
        disabled={disabled}
        bg={theme.backgroundColor.tertiary}
      >
        <Add size={24} color={theme.color.inverted} />
      </CreateModuleButton>
      <Spacer horizontal={4} />
    </SearchBarContainer>
  );
};
