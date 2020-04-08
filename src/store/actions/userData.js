import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  USER_CHANGE_PASSWORD,
} from './actionTypes';

export const userLogin = (dataProfile) => (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: dataProfile,
  });
};
export const userLogout = (dataProfile) => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
