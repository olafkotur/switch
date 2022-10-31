import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Modal } from './components/Modal';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ModulePage } from './pages/Module';
import { ActiveModuleIdState, UserState } from './state';
import { ThemeProvider } from './style/Provider';

const queryClient = new QueryClient();

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const App = (): ReactElement => {
  const user = useRecoilValue(UserState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);

  if (user == null) {
    return <LoginPage />;
  }

  const PageComponent = activeModuleId == null ? HomePage : ModulePage;
  return (
    <AppContainer>
      <Modal />
      <Sidebar />
      <PageComponent />
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
