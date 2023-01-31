import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Header } from '../components';
import { APP_TIMEOUT_MS } from '../const';
import { useInitialise, useSendMessage } from '../hooks';
import { IsAppLoadingState } from '../state';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Loading = (): ReactElement => {
  const setIsAppLoading = useSetRecoilState(IsAppLoadingState);
  const initialise = useInitialise();
  const sendMessage = useSendMessage('window-setup');

  const load = useCallback(async () => {
    await initialise();
    setTimeout(() => setIsAppLoading(false), APP_TIMEOUT_MS);
  }, [initialise, setIsAppLoading]);

  useEffect(() => {
    load();
    sendMessage({ name: 'window-setup-data', value: '' });
  }, [sendMessage]);

  return (
    <LoadingContainer>
      <Header />
    </LoadingContainer>
  );
};
