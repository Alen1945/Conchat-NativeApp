import {ADD_DATA_CHAT, REMOVE_DATA_CHAT} from '../actions/actionTypes';

const initialData = {};
export default function chatData(state = initialData, action) {
  switch (action.type) {
    case ADD_DATA_CHAT:
      return {
        ...state,
        [action.payload.idRoom]: action.payload.messages,
      };
    case REMOVE_DATA_CHAT:
      return {};
    default:
      return state;
  }
}
