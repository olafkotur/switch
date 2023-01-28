import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Loader } from './components';
import { Sidebar } from './components/Sidebar';
import { APP_TIMEOUT_MS } from './const';
import { useInitialise } from './hooks';
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

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const App = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useRecoilValue(IsAuthenticatedState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const initialise = useInitialise();

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
  }, []);

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContainer>
            <App />
          </AppContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
