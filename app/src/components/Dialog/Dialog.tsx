import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDialog } from '../../redux/interface';
import { RootState } from '../../store';

export const Dialog = (): React.ReactElement => {
  const dispatch = useDispatch();
  const dialog = useSelector((state: RootState) => state.interface.dialog);

  if (!dialog) {
    return <></>;
  }

  return (
    <div>
      <MuiDialog
        fullWidth
        open={dialog.open}
        disableEscapeKeyDown={dialog.disableEscKey}
        onClose={() => dispatch(setDialog(null))}
        PaperProps={{ style: { background: '#303136' } }}
        TransitionComponent={Grow}
      >
        <div className="primary">
          <DialogTitle>{dialog.title}</DialogTitle>
        </div>

        <div className="primary pb-2">
          <DialogContent className="pt-0">{dialog.content}</DialogContent>
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
