import React, { ReactElement, useState } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';

const App = (): ReactElement => {
  return (
    <div>
      <RecoilRoot>
        <h1>Hello World</h1>
      </RecoilRoot>
    </div>
  );
};

const element = document.createElement('div');
element.setAttribute('id', 'root');
document.body.appendChild(element);
render(<App />, element);
