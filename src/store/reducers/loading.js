import {STARTLOADING, ENDLOADING} from '../actions/actionTypes';

const initialState = false;

export default function isLoading(state = initialState, action) {
  switch (action.type) {
    case STARTLOADING:
      return true;
    case ENDLOADING:
      return false;
    default:
      return state;
  }
}
