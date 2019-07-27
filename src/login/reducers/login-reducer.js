import _ from 'lodash';
import { VALIDATE_USER, LOGIN_SUCCESS, LOGOUT_USER } from '../constants/action-types';

const initialState = {
  currentUser: {},
  users: [
    { username: 'admin', password: 'admin', usertype: 'admin' },
    { username: 'user', password: 'user', usertype: 'user' },
  ],
  authenticated: undefined,
};

function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case VALIDATE_USER: {
      return {
        ...state,
        authenticated: action.status,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.userDetails,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        currentUser: {},
        authenticated: undefined
      };
    }
    default:
      return state;
  }
}

export default loginReducer;
