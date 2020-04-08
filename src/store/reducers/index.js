import {combineReducers} from 'redux';
import isLoading from './loading';
import userData from './userData';
export default combineReducers({isLoading, userData});
