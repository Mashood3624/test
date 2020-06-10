/*eslint eqeqeq:0*/
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// eslint-disable-next-line
import LinearProgress from '@material-ui/core/LinearProgress';

const DeleteBox = (props) => {
    return (
        <Dialog aria-labelledby="customized-dialog-title" open={props.open}>
            <MuiDialogTitle disableTypography>
                <Typography variant="h6">Are you sure want to delete ?</Typography>
            </MuiDialogTitle>
            <MuiDialogActions>
                {
                    props.loadingDelete === true ?
                        <React.Fragment>
                            <div >Please wait...</div>
                        </React.Fragment>
                        : null
                }
                <React.Fragment>
                    < Button autoFocus disabled={props.loadingDelete} onClick={props.onDelete} variant="outlined" >Delete</Button>
                    <Button disabled={props.loadingDelete}  onClick={props.onCancel} variant="outlined">Cancel</Button>
                </React.Fragment>
            </MuiDialogActions>

        </Dialog >
    )
}
export default DeleteBox;