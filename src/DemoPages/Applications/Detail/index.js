import React, { Fragment } from "react";


// Layout

import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import AppFooter from "../../../Layout/AppFooter/";
import ApplicationDetails from "../../../Applications/Details/";

// Theme Options

const ApplicationDetail = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                {/* <div className="app-main__inner p-0"> */}
                <ApplicationDetails></ApplicationDetails>
                {/* </div> */}
                <div className="app-wrapper-footer">
                    <AppFooter />
                </div>
            </div>
        </div>
    </Fragment>
);

export default ApplicationDetail;
