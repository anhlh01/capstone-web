import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import UsersDetails from "./user-detail";


const UserDetailCover = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <UsersDetails></UsersDetails>
                <div className="app-wrapper-footer">
                    <AppFooter />
                </div>
            </div>
        </div>
    </Fragment>
);

export default UserDetailCover;
