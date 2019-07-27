import { createStore } from 'redux';
import indexReducer from './reducer';

const Store = createStore(indexReducer);

export default Store;
