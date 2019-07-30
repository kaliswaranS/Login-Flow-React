import React from 'react';
import PropTypes from 'prop-types';

import components from '../../components';

const { TextBox, Button } = components;

const getSubmitButton = (onSubmit) => (
  <div className="text-center">
    <Button
      text={"Login"}
      onClick={e => onSubmit(e)}
    >
    </Button>
  </div>
);

const getInputNode = (inputLabel, inputType, inputName, inputValue, onInputChange) => (
  <TextBox
    label={inputLabel}
    name={inputName}
    value={inputValue}
    type={inputType}
    onChange={e => onInputChange(e.target.value)}
  >
  </TextBox>
);

const LoginForm = ({ username, password, onUserNameChange, onPasswordChange, onSubmit }) => (
  <React.Fragment>
    {getInputNode("username", "text", "username", username, onUserNameChange)}
    {getInputNode("password", "password", "password", password, onPasswordChange)}
    {getSubmitButton(onSubmit)}
  </React.Fragment>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUserNameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;