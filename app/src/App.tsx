import { initializeApp } from 'firebase/app';
import React, { ReactElement, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Joyride from 'react-joyride';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';
import { FIREBASE_CONFIG } from './const';
import { TutorialSteps, useElectronListeners, useTutorial } from './hooks';
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
import { ThemeProvider } from './style/provider';

initializeApp(FIREBASE_CONFIG);

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

  const { options: tutorialOptions, onComplete: onTutorialComplete } = useTutorial();

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
      <Joyride
        continuous
        showSkipButton
        steps={TutorialSteps}
        styles={tutorialOptions}
        run={preferences?.showTutorial ?? false}
        callback={onTutorialComplete}
      />
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
