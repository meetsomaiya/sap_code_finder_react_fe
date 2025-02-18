import { createStore } from 'redux';
import adminReducer from './reducers/reducers';

const store = createStore(adminReducer);

export default store;