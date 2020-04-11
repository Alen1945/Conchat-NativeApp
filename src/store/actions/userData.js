import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  USER_CHANGE_PASSWORD,
} from './actionTypes';
import {
  db,
  auth,
  firestore,
  firebaseFunction,
  firebase,
} from '../../config/firebase';

function getUserData() {
  return {
    displayName: auth.currentUser.displayName || '',
    email: auth.currentUser.email || '',
    emailVerified: auth.currentUser.emailVerified || false,
    isAnonymous: auth.currentUser.isAnonymous || false,
    metadata: {
      creationTime: new Date(
        auth.currentUser.metadata.creationTime,
      ).toUTCString(),
      lastSignInTime: new Date(
        auth.currentUser.metadata.lastSignInTime,
      ).toUTCString(),
    },
    phoneNumber: auth.currentUser.phoneNumber,
    photoURL: auth.currentUser.photoURL || '',
    isOnline: true,
  };
}

export const userLogin = () => async (dispatch) => {
  try {
    await firebaseFunction.httpsCallable('updateUser')({
      isOnline: true,
    });
    const userData = await firestore
      .collection('Users')
      .doc(auth.currentUser.uid)
      .get();
    if (userData.data()) {
      console.log(userData.data());
      await dispatch({
        type: USER_LOGIN,
        payload: userData.data(),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
export const userLogout = () => async (dispatch) => {
  try {
    const resultUpdate = firebaseFunction.httpsCallable('userSignOut')();
    console.log(resultUpdate);
    if (resultUpdate) {
      await dispatch({
        type: USER_LOGOUT,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
export const updateProfile = (data = {}) => async (dispatch) => {
  try {
    const resultUpdate = await firebaseFunction.httpsCallable('updateUser')({
      ...getUserData(),
      ...data,
    });
    if (resultUpdate) {
      console.log('resultUpdate', resultUpdate);
      await dispatch({
        type: UPDATE_PROFILE,
        payload: resultUpdate.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
