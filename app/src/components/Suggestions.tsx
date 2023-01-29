import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useCreateModule } from '../hooks';
import { Suggestion } from '../typings';
import { Button } from './Button';
import { ModuleIcon, Spacer } from './Common';
import { MediumText } from './Text';

interface SuggestionsProps {
  title: string;
  data: Suggestion[];
}

const SuggestionsContainer = styled.div`
  width: calc(33% - 40px);
  padding: ${(props) => props.theme.spacing.medium};
  background: ${(props) => props.theme.backgroundColor.box};
  border-radius: ${(props) => props.theme.borderRadius.large};

  @media (max-width: 1000px) {
    width: calc(33% - 20px);
    padding: ${(props) => props.theme.spacing.small};
  }
`;

const Title = styled(MediumText)`
  margin-left: ${(props) => props.theme.spacing.small};

  @media (max-width: 1000px) {
    font-size: ${(props) => props.theme.fontSize.small};
    margin-left: ${(props) => props.theme.spacing.verySmall};
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ListItem = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  margin: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.backgroundColor.module};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  @media (max-width: 1000px) { {
    margin: ${(props) => props.theme.spacing.verySmall};
  }
`;

const Icon = styled(ModuleIcon)`
  width: 60%;
  aspect-ratio: 1 / 1;
`;

export const Suggestions = ({ title, data }: SuggestionsProps): ReactElement => {
  const createModule = useCreateModule();

  return (
    <SuggestionsContainer>
      <Title bold>{title}</Title>
      <Spacer vertical={5} />

      <ListContainer>
        {data.map((suggestion, index) => (
          <ListItem key={index} onClick={() => createModule(suggestion.url)}>
            <Icon src={suggestion.icon} draggable={false} />
          </ListItem>
        ))}
      </ListContainer>
    </SuggestionsContainer>
  );
};
