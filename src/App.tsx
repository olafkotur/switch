import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import storage from 'electron-json-storage';
import Loader from './components/Loader/Loader';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import { render } from 'react-dom';
import { IUserSettings } from './typings/d';
import { SettingsService } from './services/settings';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

interface IState {
  loading: boolean;
  initialise: boolean;
}

export default class App extends React.Component<{}, IState> {
  /**
   * Local properties
   */
  protected theme: Theme;
  protected userSettings: IUserSettings | null = null;

  /**
   * App constructor
   * @param props - class properties
   */
  constructor(props: {}) {
    super(props);

    this.state = {
      loading: true,
      initialise: true,
    };

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
        MuiChip: {
          label: {
            fontSize: 12,
            textTransform: 'lowercase',
          },
        },
      },
    });

    // storage setup
    const dataPath = storage.getDataPath();
    storage.setDataPath(dataPath);

    // scope binding
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  /**
   * Component mounting
   */
  public async componentDidMount() {
    await this.handleRefresh();
  }

  /**
   * Handles app refresh
   */
  protected async handleRefresh() {
    this.setState({ loading: true });
    this.userSettings = await SettingsService.fetch();
    this.setState({ loading: false });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        {!this.state.loading ?
          <Dashboard
            userSettings={this.userSettings as IUserSettings}
            handleRefresh={this.handleRefresh}
          />
          : <Loader shortLoader={!this.state.initialise} />
        }
      </MuiThemeProvider>
    );
  }
}

render(<App />, mainElement);
