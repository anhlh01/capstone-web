import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// APPLICATIONS

import Mailbox from "./Mailbox/";
import Chat from "./Chat/";
import FaqSection from "./FaqSection/";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
import ApplicationsList from "../../Applications/Tables/";

// Theme Options

const Applications = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        {/* <div className="app-main__inner p-0"> */}

        <Route path={`${match.url}/mailbox`} component={Mailbox} />
        <Route path={`${match.url}/chat`} component={Chat} />
        <Route path={`${match.url}/faq-section`} component={FaqSection} />
        <ApplicationsList></ApplicationsList>
        {/* </div> */}
        <div className="app-wrapper-footer">
          <AppFooter />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Applications;
