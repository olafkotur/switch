import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import storage from 'electron-json-storage';
import Loader from './components/Loader/Loader';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import { render } from 'react-dom';
import { RootState, store } from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import Dialog from './components/Dialog/Dialog';
import { UserService } from './services/user';
import { SettingsService } from './services/settings';
import { MenuService } from './services/menu';
import { setEmail, setSettings } from './redux/user';
import { setApplications } from './redux/interface';

const App = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [theme, setTheme] = React.useState<Theme>();

  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state.user);
  const { error, dialog } = useSelector((state: RootState) => state.interface);

  React.useEffect(() => {
    // storage setup
    const dataPath = storage.getDataPath();
    storage.setDataPath(dataPath);

    // TODO: Will likely have to use async/await here
    fetchUserData();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  React.useEffect(() => {
    // theme setup
    setTheme(
      createMuiTheme({
        typography: {
          fontFamily: settings.fontFamily,
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
        palette: {
          primary: {
            main: settings.accentColor,
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
      }),
    );
  }, [settings]);

  /**
   * Fetches user data and stores in redux.
   */
  const fetchUserData = async (): Promise<void> => {
    const profile = await UserService.fetchProfile();
    const settings = await SettingsService.fetch();
    const applications = await MenuService.fetchList();

    profile && dispatch(setEmail(profile.email));
    settings && dispatch(setSettings(settings));
    applications && dispatch(setApplications(applications));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <MuiThemeProvider theme={theme as Theme}>
      <div style={{ fontFamily: settings.fontFamily }}>
        <Dashboard />
        {dialog && <Dialog />}
      </div>
    </MuiThemeProvider>
  );
};

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mainElement,
);
