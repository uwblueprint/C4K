import React from 'react';
import Button from '@material-ui/core/Button';

import FullScreenDialog from './FullScreenDialog';
import Login from './Login';

// Material UI
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';

const LoginPopupButton = (props) => {
    return <IconButton onClick={props.onClick}><Person style={{ color: '#fcfcfc' }}/></IconButton>
}

const LoginDialog = () => {
    return <FullScreenDialog PageComponent={Login} ButtonComponent={LoginPopupButton} />
}

export default LoginDialog;