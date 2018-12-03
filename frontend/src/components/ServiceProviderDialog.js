import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import FullScreenDialog from './FullScreenDialog';
import ServiceProvider from './ServiceProvider';

const ServiceProviderPopupButton = (props) => {
    return <IconButton onClick={props.onClick}>Service Provider</IconButton>
}

const ServiceProviderDialog = () => {
    return <FullScreenDialog PageComponent={ServiceProvider} ButtonComponent={ServiceProviderPopupButton} />;
}

export default ServiceProviderDialog;
