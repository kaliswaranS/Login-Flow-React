import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  validateUser as validateUserAction,
  loginSuccess as loginSuccessAction,
} from '../actions/actions';

import LoginForm from './login-form';

import components from '../../components';

const { Alert } = components;

const validateUserDetails = (e, users, validateUser, loginSuccess, username, password) => {
  e.preventDefault();
  const currentUser = _.filter(users, ['username', username])[0];
  const loginStatus = currentUser ? currentUser.password === password : false;
  validateUser(loginStatus);
  if (loginStatus) {
    loginSuccess(currentUser);
    // Storing it in session, its useful when refreshing the page
    sessionStorage.setItem('user', JSON.stringify({ username: currentUser.username, usertype: currentUser.usertype }))
  }
  return false;
}

const getAlertNode = () => <Alert message='Login Failed, Please verify login details' />;

const LoginContainer = ({ isAuthenticated, users, validateUser, loginSuccess }) => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <article className="login-content">

      <form className="login-content__form" onSubmit={(e) => validateUserDetails(e, users, validateUser, loginSuccess, username, password)}>
        <h3 className="login-content__title mb-2">
          Sign in
        </h3>
        <p className="mb-5">Enter your details below</p>

        <LoginForm
          username={username}
          password={password}
          onUserNameChange={(value) => setUserName(value)}
          onPasswordChange={(value) => setPassword(value)}
          onSubmit={(e) => validateUserDetails(e, users, validateUser, loginSuccess, username, password)}
        />

        {isAuthenticated !== undefined && !isAuthenticated && getAlertNode()}

      </form>

    </article>
  );
}

function mapStateToProps(state) {
  return {
    users: _.get(state, 'login.users'),
    isAuthenticated: _.get(state, 'login.authenticated'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateUser: validateUserAction,
    loginSuccess: loginSuccessAction,
  }, dispatch);
}

LoginContainer.propTypes = {
  validateUser: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
  ),
  isAuthenticated: PropTypes.bool,
};

LoginContainer.defaultProps = {
  users: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
