import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { ThemeProvider } from './style/Provider';
import { Footer, Header } from './components';
import { HomePage } from './pages/Home';
import { MAX_PAGE_WIDTH } from './const';
import { Modal } from './modals';

const AppContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: ${MAX_PAGE_WIDTH}px;
  position: relative;
  padding-bottom: env(safe-area-inset-bottom, 30px);
`;

const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing.large};
`;

const App = (): ReactElement => {
  return (
    <>
      <Header />
      <PageContainer>
        <HomePage />
      </PageContainer>
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <Modal />
        <AppContainer>
          <App />
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
