import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IDialog } from '../../typings/d';

const Dialog = (): React.ReactElement => {
  const dialog = useSelector(
    (state: RootState) => state.interface.dialog,
  ) as IDialog;

  return (
    <div>
      <MuiDialog
        fullWidth
        open={dialog.open}
        disableEscapeKeyDown={dialog.disableEscKey}
        onClose={dialog.handleClose}
        PaperProps={{ style: { background: '#303136' } }}
      >
        <div className="primary">
          <DialogTitle>{dialog.title}</DialogTitle>
        </div>

        <div className="primary pb-2">
          <DialogContent>{dialog.content}</DialogContent>
        </div>

        {!dialog.hideButtons && (
          <DialogActions>
            {!dialog.hideSecondary && (
              <Button
                className="mr-1"
                variant="contained"
                onClick={dialog.handleSecondary}
              >
                {dialog.secondaryLabel || 'Cancel'}
              </Button>
            )}

            {!dialog.hidePrimary && (
              <Button
                className="ml-1"
                color="primary"
                variant="contained"
                onClick={dialog.handlePrimary}
              >
                {dialog.primaryLabel || 'Proceed'}
              </Button>
            )}
          </DialogActions>
        )}
      </MuiDialog>
    </div>
  );
};

export default Dialog;
