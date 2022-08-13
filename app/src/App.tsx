import React, { ReactElement } from 'react';
import { render } from 'react-dom';

const App = (): ReactElement => {
  return <h1>Hello World</h1>;
};

const element = document.createElement('div');
element.setAttribute('id', 'root');
document.body.appendChild(element);
render(<App />, element);
