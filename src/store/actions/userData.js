import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  USER_CHANGE_PASSWORD,
} from './actionTypes';
import {db, auth} from '../../config/firebase';
export const userLogin = (dataProfile) => (dispatch) => {
  db.ref(`/Users/${dataProfile.uid}`).set({
    displayName: dataProfile.displayName,
    email: dataProfile.email,
    emailVerified: dataProfile.emailVerified,
    isAnonymous: dataProfile.isAnonymous,
    metadata: {
      creationTime: dataProfile.metadata.creationTime,
      lastSignInTime: dataProfile.metadata.lastSignInTime,
    },
    phoneNumber: dataProfile.phoneNumber,
    photoURL: dataProfile.photoURL,
    isLogin: true,
  });
  dispatch({
    type: USER_LOGIN,
    payload: dataProfile,
  });
};
export const userLogout = (dataProfile) => (dispatch) => {
  db.ref(`/Users/${auth.currentUser.uid}/isLogin`).set(false);
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: USER_LOGOUT,
      });
    })
    .catch((e) => {
      db.ref(`/Users/${dataProfile.uid}/isLogin`).set(true);
    });
};
