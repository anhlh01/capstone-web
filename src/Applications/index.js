import React, { Fragment } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { withRouter } from "react-router-dom";

import ResizeDetector from "react-resize-detector";

import AppMain from "../Layout/AppMain";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closedSmallerSidebar: false,
        };
    }

    componentDidMount() {
        // Retrieve authToken from localStorage
        const storedValue = localStorage.getItem('user');

        // Check if the value is present
        if (storedValue !== null) {
            // Value found in local storage, do something with it
            // Parse the JSON string back to an object
            console.log('Value found in local storage');
            console.log(storedValue);
        } else {
            // Value not found in local storage, redirect to login page
            console.log('Value not found in local storage');
            this.props.history.push('/pages/login');
        }

        window.addEventListener('login', () => {
            this.props.history.push('/pages/login');
        })
    }

    render() {
        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;

        return (
            <ResizeDetector
                handleWidth
                render={({ width }) => (
                    <Fragment>
                        <div
                            className={cx(
                                "app-container app-theme-" + colorScheme,
                                { "fixed-header": enableFixedHeader },
                                { "fixed-sidebar": enableFixedSidebar || width < 1250 },
                                { "fixed-footer": enableFixedFooter },
                                { "closed-sidebar": enableClosedSidebar || width < 1250 },
                                {
                                    "closed-sidebar-mobile": closedSmallerSidebar || width < 1250,
                                },
                                { "sidebar-mobile-open": enableMobileMenu },
                                { "body-tabs-shadow-btn": enablePageTabsAlt }
                            )}>
                            <AppMain />

                        </div>
                    </Fragment>
                )}
            />
        );
    }
}

const mapStateToProp = (state) => ({
    colorScheme: state.ThemeOptions.colorScheme,
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedFooter: state.ThemeOptions.enableFixedFooter,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
