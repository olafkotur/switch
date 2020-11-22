import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import storage from 'electron-json-storage';
import os from 'os';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

// storage setup
storage.setDataPath(os.tmpdir());

export default class App extends React.Component {
  /**
   * Local properties
   */
  protected theme: Theme;

  /**
   * App constructor
   * @param props - class properties
   */
  constructor(props: {}) {
    super(props);

    // local properties
    this.theme = createMuiTheme({
      typography: {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
      palette: {
        primary: { main: '#227093' },
        secondary: { main: '#fff' },
      },
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <Dashboard />
      </MuiThemeProvider>
    );
  }
}

render(<App />, mainElement);
