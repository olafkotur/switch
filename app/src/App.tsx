import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Loader } from './components';
import { Sidebar } from './components/Sidebar';
import { APP_TIMEOUT_MS } from './const';
import { useElectronListeners, useInitialise, useSendMessage } from './hooks';
import { Modal } from './modals';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ModulePage } from './pages/Module';
import { ActiveModuleIdState, IsAuthenticatedState, ModalState, PreferencesState, WindowSetupState } from './state';
import { ThemeProvider } from './style/Provider';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const App = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useRecoilValue(IsAuthenticatedState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const preferences = useRecoilValue(PreferencesState);
  const windowSetup = useRecoilValue(WindowSetupState);
  const setModal = useSetRecoilState(ModalState);

  const initialise = useInitialise();
  const sendMessage = useSendMessage('window-setup');

  useElectronListeners();

  const PageComponent = useMemo(() => {
    if (activeModuleId) {
      return ModulePage;
    }
    return HomePage;
  }, [isAuthenticated, activeModuleId]);

  const load = useCallback(async () => {
    await initialise();
    setTimeout(() => setIsLoading(false), APP_TIMEOUT_MS);
  }, [initialise, setIsLoading]);

  useEffect(() => {
    load();
    sendMessage({ name: 'window-setup-data', value: '' });
  }, [sendMessage]);

  useEffect(() => {
    if (preferences == null) return;
    if (preferences.disableOverlayPrompt !== true && windowSetup.overlayMode === true) {
      setModal('overlay-prompt');
    }
  }, [preferences?.disableOverlayPrompt, windowSetup.overlayMode]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <Modal />
      <Sidebar />
      <PageContainer>
        <PageComponent />
      </PageContainer>
    </>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <AppContainer>
          <App />
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
