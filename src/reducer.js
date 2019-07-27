import { combineReducers } from 'redux';

import { reducer as loginReducer } from './login';

const rootReducer = combineReducers({
  login: loginReducer,
});

function indexReducer(state, action) {
  return rootReducer(state, action);
}

export default indexReducer;
