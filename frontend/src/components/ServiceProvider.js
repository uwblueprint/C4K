import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import "./ServiceProvider.css";

const CONTACT_KEYS = {
    address: {
        friendlyName: 'Location',
        icon: 'location_on',
    },
    phone: {
        friendlyName: 'Phone Number',
        icon: 'phone'
    },
    url: {
        friendlyName: 'Website',
        icon: 'public',
    }
}

const OPERATION_KEYS = {
    type: 'Service Provider Type',
    censusDivision: 'Census Division',
    serviceType: 'Service Type',
}

const OPERATION_KEYS_FULL = {
    ...OPERATION_KEYS,
    budget: 'Operating Budget',
    numClients: 'Clients Served',
    numStaff: 'Staff Count,'
}

const BookmarkIcon = ({ isBookmarked, handleBookmarkClick }) => {
    return (
        <span className={`bookmarkIcon ${isBookmarked ? 'bookmarked' : ''}`} onClick={handleBookmarkClick}>
            <IconButton disableRipple={true} >
                {isBookmarked ? <Bookmark fontSize="large" /> : <BookmarkBorder fontSize="large" />}
            </IconButton>
        </span>
    )
}

const EditIcon = ({ isEditing, handleClick }) => {
    return (
        <span className={`editIcon ${isEditing ? 'disabled' : ''}`} onClick={handleClick}>
            <IconButton disabled={isEditing} disableRipple={true} >
                <Edit />
            </IconButton>
        </span>
    )
}

class ServiceProvider extends React.Component {
    constructor(props) {
        super(props);
        const serviceProviderData = props.serviceProviderData || {};
        const contactData = Object.keys(CONTACT_KEYS).reduce((contactData, key) => {
            const label = {
                key,
                type: 'label',
                value: CONTACT_KEYS[key].friendlyName,
                icon: <Icon>{CONTACT_KEYS[key].icon}</Icon>
            };
            const info = { type: 'info', key, value: serviceProviderData[key]};
            return contactData.concat(label).concat(info);
        }, []);
        const operationData = Object.keys(OPERATION_KEYS_FULL).reduce((operationData, key) => {
            const label = { type: 'label', key, value: OPERATION_KEYS_FULL[key]}
            const info = { type: 'info', key, value: serviceProviderData[key]}
            return operationData.concat(label).concat(info);
        }, []);

        this.state = {
            ...serviceProviderData,
            isBookmarked: serviceProviderData.isBookmarked || false,
            notes: serviceProviderData.notes || '',
            name: serviceProviderData.name || 'Algoma Family Services',
            contactData: contactData || [],
            operationData: operationData || [],
            isEditing: false,
        };
    }

    handleBookmarkClick = () => {
        this.setState({ isBookmarked: !this.state.isBookmarked });
    }

    handleEditClick = () => {
        this.setState({ isEditing: true });
    }

    handleInputChange = (key) => {
        return (e) => {
            this.setState({ [key]: e.target.value });
        }
    }

    handleSave = () => {
        fetch(`/service_providers/${this.props.serviceProviderData.id}/update`, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify(this.state)
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        })
    }

    renderCell = ({ type, key, value, icon }) => {
        if (this.state.isEditing && type === 'info') {
            return (
                <input
                    id={`${key}-info`}
                    className={`sectionCell section-info`} 
                    value={value}
                    onChange={this.handleInputChange(key)}
                >
                </input>
            )
        }

        return (
            <div
                id={`${key}-${type}`}
                className={`sectionCell section-${type}`}
            >
                {icon && <span className="margin-right-12">{icon}</span>}
                {value}
            </div>
        )
    }

    render() {
        return (
            <div className="serviceProvider">
                <AppBar>
                    <Toolbar variant="dense">
                        <div className="toolbarLayout">
                            <img src="./assets/C4K_abbrv_gold_WHITE.png" alt="C4K" height="24px" />
                            <div className="dialogTitle">Service Provider Details</div>
                            <IconButton onClick={this.props.closeDialog} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="serviceProvider content">
                    <div className="contentHeader">
                        <div className="contentTitleContainer">
                            <div className="contentTitle">{this.state.name}</div>
                            <div className="last-updated-at">Last Updated: {this.state.lastUpdatedAt || 'N/A'}</div>
                        </div>
                        <div className="iconContainer">
                            <BookmarkIcon
                                isBookmarked={this.state.isBookmarked}
                                handleBookmarkClick={this.handleBookmarkClick}
                                />
                            <EditIcon isEditing={this.state.isEditing} handleClick={this.handleEditClick}/>
                        </div>
                    </div>


                    <div className="informationSection">
                        <div className="sectionTitle">Contact</div>
                        <div className="sectionContents">
                            {this.state.contactData.map(this.renderCell)}
                        </div>
                    </div>

                    <div className="informationSection">
                        <div className="sectionTitle">Operation</div>
                        <div className="sectionContents">
                            {this.state.operationData.map(this.renderCell)}
                        </div>
                    </div>

                    <div className="informationSection">
                        <div className="sectionTitle">Notes</div>
                        <div className="notesContainer" onClick={() => { this.notesRef.focus() }}>
                            <textarea
                                className="notes"
                                ref={r => { this.notesRef = r }}
                                onChange={this.handleInputChange('notes')}
                                readOnly={!this.state.isEditing}
                                value={this.state.notes}
                            />
                        </div>
                    </div>

                    {this.state.isEditing && <div className="buttonContainer">
                        <div className="buttonWidth">
                            <Button fullWidth variant="contained" color="default" onClick={() => this.setState({ isEditing: false })}>
                                Cancel
                            </Button>
                        </div>
                        <div className="buttonWidth">
                            <Button fullWidth variant="contained" color="primary" onClick={this.handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>}

                </div>
            </div>
        )
    }
}

export default ServiceProvider;
