import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import storage from 'electron-json-storage';
import Loader from './components/Loader/Loader';
import { createTheme, Theme, ThemeProvider } from '@material-ui/core';
import { render } from 'react-dom';
import { RootState, store } from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Dialog from './components/Dialog/Dialog';
import { UserService } from './services/user';
import { SettingsService } from './services/settings';
import { MenuService } from './services/menu';
import { setAuth, setEmail, setSettings } from './redux/user';
import { setApplications, setError } from './redux/interface';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

const App = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [theme, setTheme] = React.useState<Theme>();

  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state.user);
  const { dialog } = useSelector((state: RootState) => state.interface);

  React.useEffect(() => {
    // storage setup
    const dataPath = storage.getDataPath();
    storage.setDataPath(dataPath);

    // listen for network changes
    checkConnection();

    fetchUserData().then(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  React.useEffect(() => {
    // theme setup
    setTheme(
      createTheme({
        typography: {
          fontSize: 14,
          fontFamily: settings.fontFamily,
        },
        palette: {
          background: { default: '#303136', paper: '#303136' },
          text: { primary: '#fff' },
          primary: { main: settings.accentColor },
          secondary: { main: '#fff' },
          error: { main: '#b33939' },
        },
        overrides: {
          MuiButton: { label: { fontSize: 12, textTransform: 'lowercase' } },
        },
      }),
    );
  }, [settings]);

  /**
   * Checks if the user is connected to the internet.
   */
  const checkConnection = (): void => {
    const msg =
      'Cannot connect to the internet, Switch is using latest preferences backup until back online.';

    // check initial network state
    !window.navigator.onLine && setTimeout(() => dispatch(setError(msg)), 3000);

    // listen for network changes
    window.addEventListener('offline', () => {
      dispatch(setError(msg));
    });
  };

  /**
   * Fetches user data and stores in redux.
   */
  const fetchUserData = async (): Promise<void> => {
    const profile = await UserService.fetchProfile();
    const settings = await SettingsService.fetch();
    const applications = await MenuService.fetchList();

    dispatch(setAuth(!!profile));
    profile && dispatch(setEmail(profile.email));
    settings && dispatch(setSettings(settings));
    applications && dispatch(setApplications(applications));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme as Theme}>
      <div style={{ fontFamily: settings.fontFamily }}>
        <Dashboard />
        {dialog && <Dialog />}
      </div>
    </ThemeProvider>
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
