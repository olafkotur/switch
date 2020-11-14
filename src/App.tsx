import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

export default class App extends React.Component {
  render() {
    return (
      <Dashboard />
    );
  }
}

render(<App />, mainElement);
