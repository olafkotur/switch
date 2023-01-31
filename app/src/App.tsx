import React, { ReactElement, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';
import { useElectronListeners } from './hooks';
import { Modal } from './modals';
import { HomePage } from './pages/Home';
import { Loading } from './pages/Loading';
import { LoginPage } from './pages/Login';
import { ModulePage } from './pages/Module';
import {
  ActiveModuleIdState,
  IsAppLoadingState,
  IsAuthenticatedState,
  ModalState,
  PreferencesState,
  WindowSetupState,
} from './state';
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
  const isAppLoading = useRecoilValue(IsAppLoadingState);
  const isAuthenticated = useRecoilValue(IsAuthenticatedState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const preferences = useRecoilValue(PreferencesState);
  const windowSetup = useRecoilValue(WindowSetupState);
  const setModal = useSetRecoilState(ModalState);

  useElectronListeners();

  useEffect(() => {
    if (preferences && !preferences.disableOverlayPrompt && windowSetup.overlayMode) {
      setModal('overlay-prompt');
    }
  }, [preferences?.disableOverlayPrompt, windowSetup.overlayMode]);

  if (isAppLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <Modal />
      <Sidebar />
      <PageContainer>{activeModuleId ? <ModulePage /> : <HomePage />}</PageContainer>
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
