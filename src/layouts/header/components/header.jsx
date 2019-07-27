import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  logoutUser as logoutUserAction,
} from '../../../login';

import components from '../../../components';

const { Button } = components;

export class Header extends Component {

  logoutUser = () => {
    this.props.logoutUser();
    sessionStorage.removeItem('user');
  };

  getLogoutButton = () => (
    <div className="header__logout-btn">
      <Button
        text={"Logout"}
        onClick={this.logoutUser}
        className="btn--sm"
      >
      </Button>
    </div>
  );

  getUserName = (username) => <div>Welcome, <span className="header__username">{username}</span></div>;

  getLogoNode = () => <a href="javascript:void(0);" className="logo" role="logo">Login Flow</a>;

  render() {
    const { currentUser } = this.props;
    const { username } = currentUser;

    return (
      <header className="app-container__header header">
        <div className="container header__container">
          {this.getLogoNode()}
          <div className="header__logout-section">
            {this.getUserName(username)}
            {this.getLogoutButton()}
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: _.get(state, 'login.currentUser'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser: logoutUserAction,
  }, dispatch);
}

Header.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);