import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { ThemeProvider } from './style/Provider';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const PageContainer = styled.div`
  display: flex;
  height: calc(100% - 40px);
  width: 100%;
  position: relative;
  margin: ${(props) => props.theme.spacing.medium};
`;

const AppInternal = (): ReactElement => {
  return (
    <AppContainer>
      <PageContainer>
        <div>Hello World</div>
      </PageContainer>
    </AppContainer>
  );
};

const App = (): ReactElement => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <AppInternal />
      </ThemeProvider>
    </RecoilRoot>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
