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

const onLogoutUser = (logoutUser) => {
  logoutUser();
  sessionStorage.removeItem('user');
};

const getLogoutButton = (logoutUser) => (
  <div className="header__logout-btn">
    <Button
      text={"Logout"}
      onClick={() => onLogoutUser(logoutUser)}
      className="btn--sm"
    >
    </Button>
  </div>
);

const getUserName = (username) => <div>Welcome, <span className="header__username">{username}</span></div>;

const getLogoNode = () => <a href="javascript:void(0);" className="logo" role="logo">Login Flow</a>;

const Header = ({ currentUser, logoutUser }) => {
  const { username } = currentUser;
  return (
    <header className="app-container__header header">
      <div className="container header__container">
        {getLogoNode()}
        <div className="header__logout-section">
          {getUserName(username)}
          {getLogoutButton(logoutUser)}
        </div>
      </div>
    </header>
  );
};

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