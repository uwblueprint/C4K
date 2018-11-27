import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { ButtonComponent, PageComponent } = this.props;

        return (
            <div>
                <ButtonComponent onClick={this.handleClickOpen} />
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <PageComponent closeDialog={this.handleClose}/>
                </Dialog>
            </div>
        )
    }
}

export default FullScreenDialog;