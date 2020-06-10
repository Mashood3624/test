import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const PostBox = (props) => {
    return (
        <Dialog aria-labelledby="customized-dialog-title" open={props.open}>
            <MuiDialogTitle disableTypography>
                <Typography variant="h6">Are you sure want to Post ?</Typography>
            </MuiDialogTitle>
            <MuiDialogActions>
                {
                    props.loadingPost === true ?
                        <React.Fragment>
                            <div >Please wait...</div>
                        </React.Fragment>
                        : null
                }
                <React.Fragment>
                    <Button autoFocus disabled={props.loadingPost} onClick={props.onPost} variant="outlined" >Post</Button>
                    <Button disabled={props.loadingPost} onClick={props.onCancel} variant="outlined">Cancel</Button>
                </React.Fragment>
            </MuiDialogActions>

        </Dialog >
    )
}
export default PostBox;