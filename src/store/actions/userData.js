import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  USER_CHANGE_PASSWORD,
} from './actionTypes';
import {db, auth} from '../../config/firebase';

function getUserData() {
  return {
    displayName: auth.currentUser.displayName,
    email: auth.currentUser.email,
    emailVerified: auth.currentUser.emailVerified,
    isAnonymous: auth.currentUser.isAnonymous,
    metadata: {
      creationTime: auth.currentUser.metadata.creationTime,
      lastSignInTime: auth.currentUser.metadata.lastSignInTime,
    },
    phoneNumber: auth.currentUser.phoneNumber,
    photoURL: auth.currentUser.photoURL,
    isLogin: true,
  };
}
function SyncUserData() {
  db.ref(`/Users/${auth.currentUser.uid}`).set(getUserData());
}
export const userLogin = () => (dispatch) => {
  SyncUserData();
  db.ref(`/Profiles/${auth.currentUser.uid}`)
    .once('value')
    .then((profile) =>
      dispatch({
        type: USER_LOGIN,
        payload: {...getUserData(), ...profile.val()},
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
        type: UPDATE_PROFILE,
        payload: {...getUserData(), ...profile.val()},
      }),
    )
    .catch((err) => {
      console.log(err);
    });
};
