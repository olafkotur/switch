import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export interface IProps {
  open: boolean;
  title: string;
  content: React.ReactElement |  string;
  animate?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  handlePrimary: () => void;
  handleSecondary: () => void;
  handleClose?: () => void;
}

export default class Dialog extends React.Component<IProps> {

  /**
   * Dialog constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    // scope binding
    this.handlePrimary = this.handlePrimary.bind(this);
    this.handleSecondary = this.handleSecondary.bind(this);
  }

  /**
   * Wrapper for dialog primary action
   */
  protected handlePrimary(): void {
    this.props.handlePrimary();
    this.props.handleClose && this.props.handleClose();
  }

  /**
   * Wrapper for dialog secondary action
   */
  protected handleSecondary(): void {
    this.props.handleSecondary();
    this.props.handleClose && this.props.handleClose();
  }

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
              variant="contained"
              onClick={this.handleSecondary}
            >
              {this.props.secondaryLabel || 'Cancel'}
            </Button>

            <Button
              className="ml-1"
              color="primary"
              variant="contained"
              onClick={this.handlePrimary}
            >
              {this.props.primaryLabel || 'Proceed'}
            </Button>
          </DialogActions>

        </MuiDialog>
      </div>
    );
  }
}
