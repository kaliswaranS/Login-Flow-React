import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({ label, onChange, value, placeholder, type, name }) => (
  <div>
    <label htmlFor={label}>
      {label}
    </label>
    <input
      id={label}
      type={type}
      name={name}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  type: PropTypes.string,
};

TextBox.defaultTypes = {
  value: '',
  placeholder: '',
  type: 'text',
};

export default TextBox;