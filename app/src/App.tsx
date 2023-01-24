import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer as Toasts } from 'react-toastify';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Background, Loader } from './components';
import { Sidebar } from './components/Sidebar';
import { INITIALISE_TIMEOUT_MS } from './const';
import { useGetToastProps, useInitialise } from './hooks';
import { Modal } from './modals';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ModulePage } from './pages/Module';
import { ActiveModuleIdState, IsAuthenticatedState } from './state';
import { ThemeProvider } from './style/Provider';

const queryClient = new QueryClient();

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const App = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useRecoilValue(IsAuthenticatedState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const toastProps = useGetToastProps();
  const initialise = useInitialise();

  const PageComponent = useMemo(() => {
    if (isAuthenticated && activeModuleId) {
      return ModulePage;
    }
    if (isAuthenticated) {
      return HomePage;
    }
    return LoginPage;
  }, [isAuthenticated, activeModuleId]);

  const load = useCallback(async () => {
    await initialise();
    setTimeout(() => setIsLoading(false), INITIALISE_TIMEOUT_MS);
  }, [initialise, setIsLoading]);

  useEffect(() => {
    load();
  }, [load]);

  if (isLoading) {
    return (
      <AppContainer>
        <Background />
        <Loader />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Background />
      <PageComponent />
      <Modal />
      <Toasts {...toastProps} />
      {isAuthenticated && <Sidebar />}
    </AppContainer>
  );
};

const element = document.createElement('div');
element.setAttribute('id', 'root');
document.body.appendChild(element);
render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  element,
);
