import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Icon,
  IconButton,
  IconNames,
  LargeText,
  MediumText,
  SpaceBetweenContainer,
  Spacer,
  TextInput,
} from '../components';
import { useCreateInvite, useFetchInvites, useOnKeyPress, useTheme, useValidateEmail } from '../hooks';
import { Invite as InviteType } from '../typings';

const InviteContainer = styled.div`
  width: 500px;
  aspect-ratio: 1 / 1;
`;

const InviteContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
`;

const InputContainer = styled.div`
  width: 440px;
`;

const SendButton = styled(IconButton)`
  width: 48px;
  height: 48px;
  margin-right: 0;
  background: ${(props) => props.theme.highlightColor.quaternary};
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.backgroundColor.primary};
  margin: ${(props) => props.theme.spacing.small} 0;
  padding: ${(props) => props.theme.spacing.medium};
`;

export const Invite = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [invites, setInvites] = useState<InviteType[]>([]);
  const theme = useTheme();

  const validateEmail = useValidateEmail();
  const createInvite = useCreateInvite();
  const fetchInvites = useFetchInvites();

  const isEmailValid = useMemo(() => validateEmail(email), [email]);

  const handleSubmit = useCallback(async () => {
    const success = await createInvite(email);
    if (!success) return;

    const updatedInvites = await fetchInvites();
    setInvites(updatedInvites);
    setEmail('');
  }, [email, createInvite, setEmail, fetchInvites]);

  useOnKeyPress({ key: 'Enter', onPress: () => isEmailValid && handleSubmit() });

  useEffect(() => {
    fetchInvites().then(setInvites);
  }, []);

  return (
    <InviteContainer>
      <InviteContent>
        <LargeText>Invite to Switch</LargeText>
        <Spacer vertical={5} />

        <MediumText faint>
          We're currently fine-tuning our app through testing, and to ensure a smooth experience, we're managing the
          number of downloads. If you're excited to invite your friends and let them try it out, you absolutely can!
        </MediumText>
        <Spacer vertical={15} />

        <MediumText bold>Send an invitation</MediumText>
        <SpaceBetweenContainer>
          <InputContainer>
            <TextInput placeholder="email address" value={email} onChange={setEmail} />
          </InputContainer>
          <SendButton size="medium" disabled={!isEmailValid} onClick={handleSubmit}>
            <Icon name={IconNames.SEND} />
          </SendButton>
        </SpaceBetweenContainer>
        <Spacer vertical={10} />

        <MediumText bold>Sent invites ({invites.length})</MediumText>
        {invites.map((invite) => (
          <ListItem key={invite._id}>
            <MediumText faint>{invite.email}</MediumText>
            <Icon
              name={IconNames.CIRCLE_CHECK}
              color={invite.registered ? theme.highlightColor.quaternary : theme.color.faint}
            />
          </ListItem>
        ))}
      </InviteContent>
    </InviteContainer>
  );
};
