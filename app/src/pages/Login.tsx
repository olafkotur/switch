import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Icon,
  IconNames,
  LargeButton,
  LargeText,
  MediumText,
  SmallText,
  Spacer,
  Switch,
  TextInput,
  VeryLargeText,
} from '../components';
import { useLogin, useOnKeyPress, useSignUp, useTheme } from '../hooks';
import { Rotate } from '../style/animation';

type ContentType = 'signup' | 'login';

const SIGN_UP_COPY = {
  title: 'Sign up to Switch',
  button: 'Sign up',
  anotherWay: 'Already have an account?',
  anotherWayButton: 'Login',
  footer:
    "By clicking “Sign Up”, you agree to Switch's Terms of Service and acknowledge that Switch's Privacy Policy applies to you.",
};

const LOGIN_COPY = {
  title: 'Login to Switch',
  button: 'Login',
  anotherWay: 'Not registered?',
  anotherWayButton: 'Sign up',
  footer: '',
};

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const LoginPageCard = styled.div`
  width: 50%;
  height: 70%;
  display: flex;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.veryLarge};
  background: ${(props) => props.theme.backgroundColor.secondary};
`;

const LoginPageCardContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  filter: drop-shadow(${(props) => props.theme.dropShadow.medium});
`;

const InputContainer = styled.div`
  width: 270px;
`;

export const LoginPage = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const login = useLogin();
  const signUp = useSignUp();

  const copy = useMemo(() => (contentType === 'signup' ? SIGN_UP_COPY : LOGIN_COPY), [contentType]);
  const isNextDisabled = !username || !password;

  const background = contentType === 'signup' ? theme.highlightColor.quaternary : theme.color.normal;
  const color = contentType === 'signup' ? theme.color.white : theme.color.inverted;

  const toggleContentType = useCallback(() => {
    if (contentType === 'signup') {
      return setContentType('login');
    }
    setContentType('signup');
  }, [contentType, setContentType]);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    const handler = contentType === 'login' ? login : signUp;
    await handler({ username, password });
    setIsLoading(false);
  }, [username, password, contentType, login, signUp]);

  useOnKeyPress({ key: 'Enter', onPress: () => !isNextDisabled && handleSubmit() });

  return (
    <LoginPageContainer>
      <LoginPageCard>
        <LoginPageCardContent>
          <Switch />
          <Spacer vertical={5} />
          <VeryLargeText>{copy.title}</VeryLargeText>
          <Spacer vertical={24} />

          <InputContainer>
            <TextInput placeholder="username" value={username} onChange={setUsername} />
            <TextInput placeholder="password" value={password} onChange={setPassword} type="password" />
          </InputContainer>

          <LargeButton width="270px" bg={background} disabled={isNextDisabled || isLoading} onClick={handleSubmit}>
            <LargeText bold color={color}>
              {isLoading ? <Icon name={IconNames.LOADING} color={color} animation={Rotate({})} /> : copy.button}
            </LargeText>
          </LargeButton>

          <Spacer vertical={16} />

          <MediumText>
            {copy.anotherWay}{' '}
            <MediumText bold underline cursor="pointer" onClick={toggleContentType}>
              {copy.anotherWayButton}
            </MediumText>
          </MediumText>

          <Spacer vertical={16} />

          <SmallText faint>{copy.footer}</SmallText>
        </LoginPageCardContent>
      </LoginPageCard>
    </LoginPageContainer>
  );
};
