import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { ThemeProvider } from './style/Provider';
import { Footer, Header } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { TermsPage } from './pages/Terms';
import { PrivacyPage } from './pages/Privacy';

const AppContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: 1024px;
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
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/privacy" Component={PrivacyPage} />
            <Route path="/terms" Component={TermsPage} />
          </Routes>
        </BrowserRouter>
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
        <AppContainer>
          <App />
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
