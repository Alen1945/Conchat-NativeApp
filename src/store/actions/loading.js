import {STARTLOADING, ENDLOADING} from './actionTypes';

export const startLoading = () => async (dispatch) => {
  await dispatch({
    type: STARTLOADING,
  });
};

export const endLoading = () => async (dispatch) => {
  await dispatch({
    type: ENDLOADING,
  });
};
