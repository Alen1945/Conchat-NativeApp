import Storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';
import Database from '@react-native-firebase/database';
const auth = Auth();
const db = Database();
const storage = Storage();
export {auth, db, storage};
