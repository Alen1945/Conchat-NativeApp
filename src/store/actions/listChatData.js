import {ADD_LIST_CHAT} from './actionTypes';

export const addListChat = (data) => (dispatch) => {
  dispatch({
    type: ADD_LIST_CHAT,
    payload: data,
  });
};
