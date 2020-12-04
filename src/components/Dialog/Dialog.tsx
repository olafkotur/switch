import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

interface IProps {
  open: boolean;
  title: string;
  content: React.ReactElement |  string;
  animate?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  handlePrimary: () => void;
  handleSecondary: () => void;
  handleClose: () => void;
}

export default class Dialog extends React.Component<IProps> {
  render() {
    return (
      <div>
        <MuiDialog
          fullWidth
          open={this.props.open}
          onClose={this.props.handleClose}
          PaperProps={{ style: { background: '#303136' } }}
        >
          <div className="primary">
            <DialogTitle >{this.props.title}</DialogTitle>
          </div>

          <div className="primary">
            <DialogContent>{this.props.content}</DialogContent>
          </div>

          <DialogActions>
            <Button
              className="mr-1"
              color="primary"
              variant="contained"
              onClick={this.props.handleSecondary}
            >
              {this.props.secondaryLabel || 'Cancel'}
            </Button>

            <Button
              className="ml-1"
              color="primary"
              variant="contained"
              onClick={this.props.handlePrimary}
            >
              {this.props.primaryLabel || 'Proceed'}
            </Button>
          </DialogActions>

        </MuiDialog>
      </div>
    );
  }
}
