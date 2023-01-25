import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BodyText, LargeButton, SmallText, Spacer, TextInput, TitleText } from '../components';
import { useLogin, useResetPassword, useSignUp, useTheme } from '../hooks';
import { Switch } from '../icons';

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
`;

const InputContainer = styled.div`
  width: 270px;
`;

export const LoginPage = (): ReactElement => {
  const [contentType, setContentType] = useState<ContentType>('login');
  const [username, setUsername] = useState('olafkotur');
  const [password, setPassword] = useState('u$GQN2W7Pmnwd*743m%gVMyDB*cNXdGE');

  const theme = useTheme();
  const login = useLogin();
  const signUp = useSignUp();
  const resetPassword = useResetPassword();

  const copy = useMemo(() => (contentType === 'signup' ? SIGN_UP_COPY : LOGIN_COPY), [contentType]);
  const isNextDisabled = !username || !password;

  const toggleContentType = useCallback(() => {
    if (contentType === 'signup') {
      return setContentType('login');
    }
    setContentType('signup');
  }, [contentType, setContentType]);

  const handleSubmit = useCallback(async () => {
    const handler = contentType === 'login' ? login : signUp;
    await handler({ username, password });
  }, [username, password, contentType, login, signUp]);

  return (
    <LoginPageContainer>
      <LoginPageCard>
        <LoginPageCardContent>
          <Switch />
          <Spacer vertical={5} />
          <TitleText>{copy.title}</TitleText>
          <Spacer vertical={24} />

          <InputContainer>
            <TextInput placeholder="username" value={username} onChange={setUsername} />
            <TextInput placeholder="password" value={password} onChange={setPassword} type="password" />
          </InputContainer>

          <LargeButton width="270px" disabled={isNextDisabled} onClick={handleSubmit}>
            <BodyText color={theme.color.inverted}>{copy.button}</BodyText>
          </LargeButton>

          <Spacer vertical={16} />

          {contentType === 'login' && (
            <>
              <BodyText>
                Forgot password?{' '}
                <BodyText bold underline cursor="pointer" onClick={() => resetPassword({})}>
                  Reset
                </BodyText>
              </BodyText>
              <Spacer vertical={6} />
            </>
          )}

          <BodyText>
            {copy.anotherWay}{' '}
            <BodyText bold underline cursor="pointer" onClick={toggleContentType}>
              {copy.anotherWayButton}
            </BodyText>
          </BodyText>

          <Spacer vertical={16} />

          <SmallText faint>{copy.footer}</SmallText>
        </LoginPageCardContent>
      </LoginPageCard>
    </LoginPageContainer>
  );
};
