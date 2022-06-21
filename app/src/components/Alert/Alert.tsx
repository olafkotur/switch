import { IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/interface';
import { RootState } from '../../store';
import './styles.css';

export const Alert = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state.user);
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
    <div className="alert-container d-flex justify-content-center">
      <Slide in={true} direction="down" timeout={300}>
        <div className="alert-container-bg d-flex justify-content-center align-items-center">
          <div className="alert-text-container d-flex align-items-center justify-content-center">
            <span className="primary alert-text">{error}</span>
            <IconButton
              className="p-1 m-0 position-absolute alert-close-button"
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
