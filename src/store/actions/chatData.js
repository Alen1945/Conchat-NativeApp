import {ADD_DATA_CHAT} from './actionTypes';

export const addDataChat = (data) => (dispatch) => {
  dispatch({
    type: ADD_DATA_CHAT,
    payload: data,
  });
};
