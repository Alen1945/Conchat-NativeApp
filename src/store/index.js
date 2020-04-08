import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import RootReducers from './reducers';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isLoading'],
};

const persistedReducer = persistReducer(persistConfig, RootReducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
