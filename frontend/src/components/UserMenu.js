import React from 'react';
import Person from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FullScreenDialog from './FullScreenDialog';
import Login from './Login';

const LoginPopup = props => {
    return <MenuItem onClick={props.onClick}>Log in</MenuItem>;
}

class UserMenu extends React.Component {
    state = {
        anchorRef: null
    }

    handleClick = e => {
        this.setState({ anchorRef: e.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorRef: null });
    }

    renderOptions = () => {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <MenuItem>Log out</MenuItem>
                    {this.props.tokenID && <MenuItem>Manage users</MenuItem>}
                </div>
            )
        }

        return (
            <FullScreenDialog PageComponent={Login} ButtonComponent={LoginPopup} />
        )
    }

    render() {
        return (
            <div>
                <Person size="small" onClick={this.handleClick} />
                <Menu
                    anchorEl={this.state.anchorRef}
                    open={Boolean(this.state.anchorRef)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            height: "fit-content",
                        }
                    }}
                    // anchorReference="anchorPosition"
                    // anchorPosition={{
                    //     top: "52px",
                    //     left: "376px",
                    // }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {this.renderOptions()}
                </Menu>
            </div>
        )
    }
}

export default UserMenu;
