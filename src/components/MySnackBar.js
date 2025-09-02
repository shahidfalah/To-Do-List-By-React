import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { useZman } from "use-zman";

export default function MySnackBar({open,textType}) {

    const { texts } = useZman();
    
    let text
    if(textType==="updateText"){
        text=texts.toastMessage.updateText
    }else if(textType==="deleteText"){
        text=texts.toastMessage.deleteText
    }
    else if(textType==="createText"){
        text=texts.toastMessage.createText
    }
    else if(textType==="checkText"){
        text=texts.toastMessage.checkText
    }
    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="Note archived"
                action={action}
            >
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}