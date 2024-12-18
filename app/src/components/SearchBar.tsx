import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SEARCH_BAR_PLACEHOLDER } from '../const';
import { useOnKeyPress, useTheme } from '../hooks';
import { ChangeColor } from '../style/animation';
import { Spacer } from './Common';
import { Icon, IconNames } from './Icon';
import { Input } from './Input';

interface SearchBarProps {
  value: string;
  isValid: boolean;
  setValue: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
}

const SearchBarContainer = styled.div`
  display: flex;
  width: 70%;
  height: 50px;
  background: ${(props) => props.theme.backgroundColor.box};
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

const ValidContainer = styled(motion.div)`
  align-self: center;
`;

export const SearchBar = ({ value, isValid, setValue, onSubmit }: SearchBarProps): ReactElement => {
  const theme = useTheme();

  const animation = ChangeColor({ color: isValid ? theme.highlightColor.quaternary : theme.color.faint });

  useOnKeyPress({ key: 'Enter', onPress: () => isValid && onSubmit(value) });

  return (
    <SearchBarContainer className="tutorial-step-2">
      <LeftSection>
        <Spacer horizontal={7} />
        <Icon name={IconNames.SEARCH} size={24} />
        <Spacer horizontal={7} />
        <SearchBarInput placeholder={SEARCH_BAR_PLACEHOLDER} value={value} onChange={(e) => setValue(e.target.value)} />
        <Spacer horizontal={7} />
      </LeftSection>

      <ValidContainer {...animation}>
        <Icon name={IconNames.CIRCLE_CHECK} color="inherit" size={24} />
      </ValidContainer>
      <Spacer horizontal={4} />
    </SearchBarContainer>
  );
};
