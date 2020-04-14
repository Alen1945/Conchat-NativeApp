import {combineReducers} from 'redux';
import isLoading from './loading';
import userData from './userData';
import chatData from './chatData';
import listChatData from './listChatData';
export default combineReducers({isLoading, userData, chatData, listChatData});
