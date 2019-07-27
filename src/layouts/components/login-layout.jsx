import React from 'react';
import PropTypes from 'prop-types';

const LoginLayout = ({ children }) => (
  <main className="login-container">
    {children}
  </main>
);

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default LoginLayout;
