import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from './style/provider';

const App = (): ReactElement => {
  return (
    <ThemeProvider>
      <span>Hello World</span>
    </ThemeProvider>
  );
};

const element = document.createElement('div');
element.setAttribute('id', 'root');
document.body.appendChild(element);
render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  element,
);
