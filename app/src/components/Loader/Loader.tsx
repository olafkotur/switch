import { Zoom } from '@material-ui/core';
import React from 'react';
// @ts-ignore
import Loading from 'react-loading-components';
import './loader.css';

const Loader = (): React.ReactElement => {
  const [color, setColor] = React.useState<string>('');
  const [showText, setShowText] = React.useState<boolean>(true);
  const [showLoader, setShowLoader] = React.useState<boolean>(false);

  React.useEffect(() => {
    // switch between text and loader
    const interval = setInterval(() => {
      const availableColors = ['#fff', '#B33939', '#227093', '#CCAE62'];
      const random = Math.floor(Math.random() * 5) + 1;
      setColor(availableColors[random - 1]);

      setShowText((showText) => !showText);
      setShowLoader((showLoader) => !showLoader);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Zoom in={showText}>
        <div className="d-flex flex-row position-absolute">
          <h1 className="loader-text secondary mr-2">s</h1>
          <h1 className="loader-text primary mr-2">w</h1>
          <h1 className="loader-text primary mr-2">i</h1>
          <h1 className="loader-text primary mr-2">t</h1>
          <h1 className="loader-text tertiary mr-2">c</h1>
          <h1 className="loader-text quaternary mr-2">h</h1>
        </div>
      </Zoom>
      <Zoom in={showLoader}>
        <div>
          <Loading type="grid" width={80} height={80} fill={color} />
        </div>
      </Zoom>
    </div>
  );
};

export default Loader;
