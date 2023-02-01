import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Header, Icon, IconNames, LargeButton, MediumText, Spacer } from '../components';
import { APP_TIMEOUT_MS, IS_PRODUCTION } from '../const';
import { useInitialise, useSendMessage } from '../hooks';
import { AppUpdatesState, IsAppLoadingState } from '../state';
import { Rotate } from '../style/animation';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Loading = (): ReactElement => {
  const appUpdates = useRecoilValue(AppUpdatesState);
  const setIsAppLoading = useSetRecoilState(IsAppLoadingState);
  const initialise = useInitialise();
  const sendMessage = useSendMessage('window-setup');

  const load = useCallback(async () => {
    if (appUpdates.isUpdateAvailable === false || !IS_PRODUCTION) {
      await initialise();
      setTimeout(() => setIsAppLoading(false), APP_TIMEOUT_MS);
    }
  }, [appUpdates, initialise, setIsAppLoading]);

  useEffect(() => {
    load();
    sendMessage({ name: 'window-setup-data', value: true });
  }, [appUpdates, sendMessage]);

  return (
    <LoadingContainer>
      <Header />
      <Spacer vertical={20} />
      <CheckForUpdate />
    </LoadingContainer>
  );
};

const CheckForUpdateButton = styled(LargeButton)<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 225px;
  height: 30px;
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) =>
    props.isActive ? props.theme.highlightColor.quaternary : props.theme.backgroundColor.primary};
`;

const CheckForUpdate = (): ReactElement => {
  const appUpdates = useRecoilValue(AppUpdatesState);
  const sendMessage = useSendMessage('app-updates');

  const isButtonActive = appUpdates.isUpdateDownloaded === true;

  const copy = useMemo(() => {
    if (appUpdates.isUpdateDownloaded) {
      return 'Install update';
    } else if (appUpdates.isUpdateDownloading) {
      return 'Downloading update';
    }
    return 'Checking for update';
  }, [appUpdates]);

  const handleDownloadUpdate = useCallback(() => {
    sendMessage({ name: 'quit-and-install', value: true });
  }, [sendMessage]);

  useEffect(() => {
    sendMessage({ name: 'check-for-update', value: true });
  }, [sendMessage]);

  return (
    <CheckForUpdateButton isActive={isButtonActive} disabled={!isButtonActive} onClick={handleDownloadUpdate}>
      <MediumText bold>{copy}</MediumText>
      <Spacer horizontal={5} />
      {!isButtonActive && <Icon name={IconNames.LOADING} size={14} animation={Rotate({})} />}
    </CheckForUpdateButton>
  );
};
