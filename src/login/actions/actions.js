import { VALIDATE_USER, LOGIN_SUCCESS, LOGOUT_USER } from '../constants/action-types';

function validateUser(status) {
  return {
    type: VALIDATE_USER,
    status,
  };
}

function loginSuccess(userDetails) {
  return {
    type: LOGIN_SUCCESS,
    userDetails,
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export {
  validateUser,
  loginSuccess,
  logoutUser
};
