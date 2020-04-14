import {ADD_LIST_CHAT, REMOVE_LIST_CHAT} from '../actions/actionTypes';

const initialData = {};
export default function listChatData(state = initialData, action) {
  switch (action.type) {
    case ADD_LIST_CHAT:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_LIST_CHAT:
      return {};
    default:
      return state;
  }
}
