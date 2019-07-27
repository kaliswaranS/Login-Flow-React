import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import routes from './routes';
import { LoginLayout, MainLayout } from './layouts';

import {
  validateUser as validateUserAction,
  loginSuccess as loginSuccessAction,
} from './login/actions/actions';


export class App extends Component {

  componentWillMount = () => {
    if (this.props.isAuthenticated) return;
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser) {
      this.props.validateUser(true);
      this.props.loginSuccess(currentUser);
    }
  }

  generateRoutes = (routeList, loginSuccess = false) => {
    return (
      _.map(routeList, ({ path, exact, component: Component, usertype }) => {
        // Need to get the logged in user from session, since redux actions are async
        if (loginSuccess && !_.includes(usertype, JSON.parse(sessionStorage.getItem('user')).usertype)) return;
        return <Route
          key={path}
          path={path}
          exact={exact}
          component={Component}
        />
      })
    );
  }

  renderRoutes = () => (
    ((sessionStorage.getItem('user') !== null) ||
      (this.props.isAuthenticated)) ?
      this.generatePrivateRoutes()
      :
      this.generateLoginRoutes()
  )

  generatePrivateRoutes = () => (
    this.props.location.pathname === '/' ?
      <Redirect push to="/home" />
      :
      <MainLayout>
        {this.generateRoutes(routes.postLoginRoutes, true)}
      </MainLayout>
  )

  generateLoginRoutes = () => (
    this.props.location.pathname === '/' ?
      <LoginLayout>
        {this.generateRoutes(routes.preLoginRoutes)}
      </LoginLayout>
      :
      <Redirect push to="/" />
  )

  render() {
    return (
      <Switch>
        {this.renderRoutes()}
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: _.get(state, 'login.authenticated'),
    currentUser: _.get(state, 'login.currentUser'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateUser: validateUserAction,
    loginSuccess: loginSuccessAction,
  }, dispatch);
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
