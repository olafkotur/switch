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
// class Dialogg extends React.Component<IProps> {
//   /**
//    * Dialog constructor
//    * @param props - component properties
//    */
//   constructor(props: IProps) {
//     super(props);

//     // scope binding
//     this.handlePrimary = this.handlePrimary.bind(this);
//     this.handleSecondary = this.handleSecondary.bind(this);
//   }

//   /**
//    * Wrapper for dialog primary action
//    */
//   protected handlePrimary(): void {
//     // this is an optional function
//     if (this.props.handlePrimary) {
//       this.props.handlePrimary();
//     }
//     this.props.handleClose && this.props.handleClose();
//   }

//   /**
//    * Wrapper for dialog secondary action
//    */
//   protected handleSecondary(): void {
//     // this is an optional function
//     if (this.props.handleSecondary) {
//       this.props.handleSecondary();
//     }
//     this.props.handleClose && this.props.handleClose();
//   }

//   render() {
//     return (
//       <div>
//         <MuiDialog
//           fullWidth
//           open={this.props.open}
//           disableEscapeKeyDown={this.props.disableEscKey}
//           onClose={this.props.handleClose}
//           PaperProps={{ style: { background: '#303136' } }}
//         >
//           <div className="primary">
//             <DialogTitle>{this.props.title}</DialogTitle>
//           </div>

//           <div className="primary pb-2">
//             <DialogContent>{this.props.content}</DialogContent>
//           </div>

//           {!this.props.hideButtons && (
//             <DialogActions>
//               {!this.props.hideSecondary && (
//                 <Button
//                   className="mr-1"
//                   variant="contained"
//                   onClick={this.handleSecondary}
//                 >
//                   {this.props.secondaryLabel || 'Cancel'}
//                 </Button>
//               )}

//               {!this.props.hidePrimary && (
//                 <Button
//                   className="ml-1"
//                   color="primary"
//                   variant="contained"
//                   onClick={this.handlePrimary}
//                 >
//                   {this.props.primaryLabel || 'Proceed'}
//                 </Button>
//               )}
//             </DialogActions>
//           )}
//         </MuiDialog>
//       </div>
//     );
//   }
// }
