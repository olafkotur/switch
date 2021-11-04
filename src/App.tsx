import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import storage from 'electron-json-storage';
import Loader from './components/Loader/Loader';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import { render } from 'react-dom';
import { FontFamily, IUserSettings } from './typings/d';
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
  protected theme: Theme | null = null;
  protected userSettings: IUserSettings | null = null;
  protected defaultFontFamily: FontFamily = 'Arial';
  protected defaultAccentColor = '#227093';

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
   * Apply user settings to application.
   */
  protected applyUserSettings() {
    this.theme = createMuiTheme({
      typography: {
        fontFamily: this.userSettings?.fontFamily || this.defaultFontFamily,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
      palette: {
        primary: {
          main: this.userSettings?.accentColor || this.defaultAccentColor,
        },
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
  }

  /**
   * Handles app refresh
   */
  protected async handleRefresh() {
    this.setState({ loading: true });
    this.userSettings = await SettingsService.fetch();
    this.applyUserSettings();
    this.setState({ loading: false });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme as Theme}>
        {!this.state.loading ? (
          <div
            style={{
              fontFamily:
                this.userSettings?.fontFamily || this.defaultFontFamily,
            }}
          >
            <Dashboard
              userSettings={this.userSettings as IUserSettings}
              handleRefresh={this.handleRefresh}
            />
          </div>
        ) : (
          <Loader shortLoader={!this.state.initialise} />
        )}
      </MuiThemeProvider>
    );
  }
}

render(<App />, mainElement);
