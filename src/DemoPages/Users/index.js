import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
import UsersList from "./user-list";
import PageTitle from '../../Layout/AppMain/PageTitle';


const Users = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <UsersList></UsersList>
                <div className="app-wrapper-footer">
                    <AppFooter />
                </div>
            </div>
        </div>
    </Fragment>
);

export default Users;
