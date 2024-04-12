import React, { Fragment } from "react";


import { withRouter } from 'react-router-dom';

import {
  DropdownToggle,
  DropdownMenu,
  Button,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-toastify/dist/ReactToastify.css';

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";

class UserBox extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      active: false,
      user: null
    };

  }

  componentDidMount() {
    // Retrieve value from local storage
    const storedValue = localStorage.getItem('user');
    if (storedValue !== null) {
      // Value found in local storage
      // this.setState({ storedValue });

      let user = JSON.parse(storedValue)
      console.log("debug 1 start")
      console.log(user)
      console.log("debug 1 end")
      this.setState({ user: user.user.name })
    } else {
      // Value not found in local storage
      console.log('Value not found in local storage');
    }
  }

  notify2 = () =>
  (this.toastId = toast(
    "You don't have any new items in your calendar for today! Go out and play!",
    {
      transition: Bounce,
      closeButton: true,
      autoClose: 5000,
      position: "bottom-center",
      type: "success",
    }
  ));

  handleLogout = () => {
    localStorage.removeItem('user');
    this.props.history.push('/login');
  };

  render() {
    const storedUserName = this.state.user;
    return (
      <Fragment>
        <div className="header-btn-lg pe-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    <img width={42} className="rounded-circle" src={avatar1} alt="" />
                    <FontAwesomeIcon
                      className="ms-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu end className="rm-pointers dropdown-menu-lg padding-bottom-none">
                    <div className="dropdown-menu-header border-bottom-radius margin-bottom-none">
                      <div className="dropdown-menu-header-inner border-bottom-radius bg-info">
                        <div className="menu-header-image border-bottom-radius opacity-2"
                          style={{
                            backgroundImage: "url(" + city3 + ")",
                          }} />
                        <div className="menu-header-content text-start">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left me-3">
                                <img width={42} className="rounded-circle" src={avatar1} alt="" />
                              </div>
                              <div className="widget-content-left">
                                <div className="widget-heading">
                                  {storedUserName}
                                </div>
                                {/* <div className="widget-subheading opacity-8">
                                  A short profile description
                                </div> */}
                              </div>
                              <div className="widget-content-right me-2">
                                <Button className="btn-pill btn-shadow btn-shine" color="focus" onClick={this.handleLogout}>
                                  Logout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>

            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(UserBox);
