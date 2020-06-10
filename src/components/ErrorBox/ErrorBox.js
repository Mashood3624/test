import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ErrorBox = (props) => {
    return (
        <div style={{ zIndex: 1000 }}>
            <Snackbar open={props.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={4000} onClose={props.onClose}>
                <MuiAlert onClose={props.onClose} elevation={6} variant="filled" severity="error">
                    {props.msg}
                </MuiAlert >
            </Snackbar>
        </div>
    )
}
export default ErrorBox;