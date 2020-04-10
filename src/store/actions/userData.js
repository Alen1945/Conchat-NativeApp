import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  USER_CHANGE_PASSWORD,
} from './actionTypes';
import {db, auth} from '../../config/firebase';

function getUserData(dataProfile) {
  return {
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
  };
}
function SyncUserData(dataProfile) {
  if (!dataProfile) {
    dataProfile = auth.currentUser;
  }
  db.ref(`/Users/${dataProfile.uid}`).set(getUserData(dataProfile));
}
export const userLogin = (dataProfile) => (dispatch) => {
  SyncUserData(dataProfile);
  db.ref(`/Profiles/${dataProfile.uid}`)
    .once('value')
    .then((profile) =>
      dispatch({
        type: USER_LOGIN,
        payload: {...getUserData(dataProfile), ...profile.val()},
      }),
    )
    .catch((err) => {
      console.log(err);
    });
};
export const userLogout = () => (dispatch) => {
  db.ref(`/Users/${auth.currentUser.uid}/isLogin`).set(false);
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: USER_LOGOUT,
      });
    })
    .catch((e) => {
      db.ref(`/Users/${auth.currentUser.uid}/isLogin`).set(true);
    });
};
export const updateProfile = () => (dispatch) => {
  SyncUserData();
  db.ref(`/Profiles/${auth.currentUser.uid}`)
    .once('value')
    .then((profile) =>
      dispatch({
        type: USER_LOGIN,
        payload: {...getUserData(auth.currentUser), ...profile.val()},
      }),
    )
    .catch((err) => {
      console.log(err);
    });
};
