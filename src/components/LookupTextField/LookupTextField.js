import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const LookupTextField = (props) => {
    return (
        <TextField

            fullWidth
            color="primary"
            style={{ display: 'block' }}
            label={props.label}
            value={props.value}
            disabled={props.disabled}
            variant="outlined"
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <div className="lookup-button">
                        <IconButton
                            variant="text"
                            disabled={props.disabled}
                            onClick={props.onClick}
                        >
                            <MoreHorizIcon disabled={true} fontSize="large" />
                        </IconButton>
                    </div>
                </InputAdornment>,
            }}
            inputProps={{
                readOnly: true
            }}
        />
    )
}

export default LookupTextField;