import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './custom.css';
import Landing from './pages/Landing/Landing';

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
        error: { main: '#b33939' },
      },
      overrides: {
        MuiButton: {
          label: {
            fontSize: 12,
            textTransform: 'lowercase',
          },
        },
      },
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <Landing />
      </MuiThemeProvider>
    );
  }
}
