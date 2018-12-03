import React from 'react';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';

import FullScreenDialog from './FullScreenDialog';
import Login from './Login';

const LoginPopupButton = (props) => {
    return <IconButton onClick={props.onClick}><Person style={{ color: '#fcfcfc' }}/></IconButton>
}

const LoginDialog = () => {
    return <FullScreenDialog PageComponent={Login} ButtonComponent={LoginPopupButton} />
}

export default LoginDialog;
