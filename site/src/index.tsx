import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ThemeProvider } from './style/Provider';
import { Footer, Header } from './components';
import { HomePage } from './pages/Home';
import { TermsPage } from './pages/Terms';
import { PrivacyPage } from './pages/Privacy';
import { PageState } from './state';
import { Pages } from './typings';

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
  const [page, setPage] = useRecoilState(PageState);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedPage = urlParams.get('page');
    if (requestedPage == null) return;

    const isValid = Object.values(Pages).includes(requestedPage as Pages);
    if (isValid === false) return;

    setPage(requestedPage as Pages);
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        {page === 'home' && <HomePage />}
        {page === 'privacy' && <PrivacyPage />}
        {page === 'terms' && <TermsPage />}
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
