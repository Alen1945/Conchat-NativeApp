import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  USER_CHANGE_PASSWORD,
} from '../actions/actionTypes';

const initialState = {
  isLogin: false,
  dataProfile: {},
};
export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        isLogin: true,
        dataProfile: action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    case UPDATE_PROFILE:
      return {
        ...state,
        dataProfile: action.payload,
      };
    default:
      return state;
  }
}
