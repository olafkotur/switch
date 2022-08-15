import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ModulePage } from './pages/Module';
import { ModuleState, UserState } from './state';
import { ThemeProvider } from './style/Provider';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const App = (): ReactElement => {
  const user = useRecoilValue(UserState);
  const module = useRecoilValue(ModuleState);
  if (user == null) {
    return <LoginPage />;
  }

  const PageComponent = module == null ? HomePage : ModulePage;
  return (
    <Wrapper>
      <Sidebar />
      <PageComponent />
    </Wrapper>
  );
};

const element = document.createElement('div');
element.setAttribute('id', 'root');
document.body.appendChild(element);
render(
  <RecoilRoot>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  element,
);
