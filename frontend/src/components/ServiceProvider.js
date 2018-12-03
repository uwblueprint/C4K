import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
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
        <span className={`bookmarkIcon iconContainer ${isBookmarked ? 'bookmarked' : ''}`} onClick={handleBookmarkClick}>
            <IconButton>
                {isBookmarked ? <Bookmark fontSize="large" /> : <BookmarkBorder fontSize="large" />}
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
        };
    }

    handleBookmarkClick = () => {
        this.setState({ isBookmarked: !this.state.isBookmarked });
    }

    handleInputChange = (key) => {
        return (e) => {
            this.setState({ [key]: e.target.value });
        }
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
                    <div className="contentTitle">
                        <span>{this.state.name}</span>
                        <BookmarkIcon
                            isBookmarked={this.state.isBookmarked}
                            handleBookmarkClick={this.handleBookmarkClick}
                        />
                    </div> 

                    <div className="informationSection">
                        <div className="sectionTitle">Contact</div>
                        <div className="sectionContents">
                            {this.state.contactData.map(({ type, key, value, icon}) =>
                                <div id={`${key}-${type}`} className={`sectionCell section-${type}`}>
                                    {icon && <span className="margin-right-12">{icon}</span>}
                                    {value}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="informationSection">
                        <div className="sectionTitle">Operation</div>
                        <div className="sectionContents">
                            {this.state.operationData.map(({ type, key, value}) =>
                                <div id={`${key}-${type}`} className={`sectionCell section-${type}`}>
                                    {value}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="informationSection">
                        <div className="sectionTitle">Notes</div>
                        <div className="notesContainer" onClick={() => { this.notesRef.focus() }}>
                            <textarea
                                ref={r => { this.notesRef = r }}
                                className="notes"
                                onChange={this.handleInputChange('notes')}
                                value={this.state.notes}
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ServiceProvider;
