import React from 'react';
import Button from '@material-ui/core/Button';

import FullScreenDialog from './FullScreenDialog';
import Login from './Login';

const LoginPopupButton = (props) => {
    return <Button onClick={props.onClick}>Log in</Button>
}

const LoginDialog = () => {
    return <FullScreenDialog PageComponent={Login} ButtonComponent={LoginPopupButton} />
}

export default LoginDialog;