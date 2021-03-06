import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const navList = [
  { name: 'Homepage', path: '/home', usertype: ["admin", "user"] },
  { name: 'Logs', path: '/logs', usertype: ["admin", "user"] },
  { name: 'Settings', path: '/settings', usertype: ["admin"] },
];

const generateMenuItem = (menu, currentUser) => {
  const { path, name, usertype } = menu;
  // Menu item will be generated on conditional basis
  if (currentUser && !_.includes(usertype, currentUser.usertype)) return;

  return (
    <li className="nav__item" key={name}>
      <NavLink to={path} className="nav__text" role="nav-item" activeClassName="nav__text--active">
        {name}
      </NavLink>
    </li>
  );
}

const Navigation = ({ currentUser }) => (
  <aside className="app-container__aside">
    <nav className="nav">
      {_.map(navList, (nav) => generateMenuItem(nav, currentUser))}
    </nav>
  </aside>
);

function mapStateToProps(state) {
  return {
    currentUser: _.get(state, 'login.currentUser'),
  };
}

Navigation.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Navigation);