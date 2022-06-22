import { IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stylesheet from 'reactjs-stylesheet';
import { setError } from '../redux/interface';
import { RootState } from '../store';

export const Alert = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.interface);

  React.useEffect(() => {
    // close automatically if no action
    setTimeout(() => handleClose(), 10000);
  }, []);

  /**
   * Handles close event.
   */
  const handleClose = (): void => {
    dispatch(setError(''));
  };

  return (
    <div className="d-flex justify-content-center" style={styles.container}>
      <Slide in={true} direction="down" timeout={300}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={styles.containerBg}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={styles.containerText}
          >
            <span className="primary" style={styles.text}>
              {error}
            </span>
            <IconButton
              className="p-1 m-0 position-absolute"
              style={styles.closeButton}
              onClick={handleClose}
            >
              <Close className="primary" fontSize="small" />
            </IconButton>
          </div>
        </div>
      </Slide>
    </div>
  );
};

const styles = Stylesheet.create({
  container: {
    width: '100%',
  },
  containerBg: {
    position: 'absolute',
    borderRadius: 25,
    marginTop: 10,
    height: 50,
    width: '60vw',
    top: 0,
    zIndex: 10000,
    backgroundColor: 'rgba(179, 57, 57, 0.7)',
  },
  containerText: {
    width: '70%',
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
  },
  closeButton: {
    right: 20,
  },
});
