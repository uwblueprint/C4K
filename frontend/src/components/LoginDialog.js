import React from 'react';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';

import FullScreenDialog from './FullScreenDialog';
import Login from './Login';

const LoginPopupButton = (props) => {
    return <Person style={{ color: '#fcfcfc' }} size="small" onClick={props.onClick} />
}

const LoginDialog = () => {
    return <FullScreenDialog PageComponent={Login} ButtonComponent={LoginPopupButton} />
}

export default LoginDialog;
