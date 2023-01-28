import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useCreateModule } from '../hooks';
import { Suggestion } from '../typings';
import { Button } from './Button';
import { ModuleIcon, Spacer } from './Common';
import { BodyText } from './Text';

interface SuggestionsProps {
  title: string;
  data: Suggestion[];
}

const SuggestionsContainer = styled.div`
  width: calc(33% - 40px);
  padding: ${(props) => props.theme.spacing.medium};
  background: ${(props) => props.theme.backgroundColor.box};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;

const Title = styled(BodyText)`
  margin-left: ${(props) => props.theme.spacing.small};
`;

const ListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ListItem = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100%;
  width: 90%;
  margin: ${(props) => props.theme.spacing.small};
  background: ${(props) => props.theme.backgroundColor.module};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

const Icon = styled(ModuleIcon)`
  position: absolute;
  top: 25%;
  width: 55%;
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
