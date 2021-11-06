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
import Dialog from './components/Dialog/Dialog';

const App = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [theme, setTheme] = React.useState<Theme>();

  const { settings } = useSelector((state: RootState) => state.user);
  const { error, dialog } = useSelector((state: RootState) => state.interface);

  React.useEffect(() => {
    // storage setup
    const dataPath = storage.getDataPath();
    storage.setDataPath(dataPath);

    setTimeout(() => setLoading(false), 750);
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
