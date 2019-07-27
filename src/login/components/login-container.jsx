import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  validateUser as validateUserAction,
  loginSuccess as loginSuccessAction,
} from '../actions/actions';

import components from '../../components';

const { TextBox, Button, Alert } = components;

export class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  validateUserDetails = (e) => {
    e.preventDefault();
    const currentUser = _.filter(this.props.users, ['username', this.state.username])[0];
    const loginStatus = currentUser ? currentUser.password === this.state.password : false;
    this.props.validateUser(loginStatus);
    if (loginStatus) {
      this.props.loginSuccess(currentUser);
      // Storing it in session, its useful when refreshing the page
      sessionStorage.setItem('user', JSON.stringify({ username: currentUser.username, usertype: currentUser.usertype }))
    }
    return false;
  }

  getSubmitbutton = () => (
    <div className="text-center">
      <Button
        text={"Login"}
        onClick={this.validateUserDetails}
      >
      </Button>
    </div>
  )

  updateTextboxValue = (e) => this.setState({ [e.target.name]: e.target.value });

  getAlertNode = () => <Alert message='Login Failed, Please verify login details' />;

  render() {

    const { isAuthenticated } = this.props;

    const { username } = this.state;

    return (
      <article className="login-content">

        <form className="login-content__form" onSubmit={this.validateUserDetails}>
          <h3 className="login-content__title mb-2">
            Sign in
            </h3>
          <p className="mb-5">Enter your details below</p>

          <TextBox
            label="username"
            onChange={e => this.updateTextboxValue(e)}
            name="username"
            value={username}
          >
          </TextBox>

          <TextBox
            label="password"
            onChange={e => this.updateTextboxValue(e)}
            type="password"
            name="password"
          >
          </TextBox>

          {this.getSubmitbutton()}

          {isAuthenticated !== undefined && !isAuthenticated && this.getAlertNode()}

        </form>

      </article>
    );
  }
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
