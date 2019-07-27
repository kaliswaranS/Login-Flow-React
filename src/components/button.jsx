import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, className, type }) => (
  <button
    className={`btn ${className}`}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultTypes = {
  className: '',
  type: 'button',
};

export default Button;
