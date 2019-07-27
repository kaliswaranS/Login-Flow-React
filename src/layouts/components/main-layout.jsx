import React from 'react';
import PropTypes from 'prop-types';
import { Header, Navigation } from '../../layouts';

const MainLayout = ({ children }) => (
  <div className="app-container">
    <Header />
    <main className="app-container__main">
      <Navigation />
      {children}
    </main>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default MainLayout;
