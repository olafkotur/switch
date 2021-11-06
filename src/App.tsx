import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import storage from 'electron-json-storage';
import Loader from './components/Loader/Loader';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core';
import { render } from 'react-dom';
import { RootState, store } from './store';
import { Provider, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

interface IState {
  loading: boolean;
  initialise: boolean;
}

const App = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [initialise, setInitialise] = React.useState<boolean>(true);
  const [theme, setTheme] = React.useState<Theme>();
  const { settings } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    // storage setup
    const dataPath = storage.getDataPath();
    storage.setDataPath(dataPath);

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

    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return <Loader shortLoader={!initialise} />;
  }

  return (
    <MuiThemeProvider theme={theme as Theme}>
      <div style={{ fontFamily: settings.fontFamily }}>
        <Dashboard userSettings={settings} handleRefresh={async () => {}} />
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
