import {configureStore, combineReducers} from '@reduxjs/toolkit';
import TokenReducers from '../Reducers/TokenReducers';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/apiConst';
import TaskReducer from '../Reducers/TaskReducer';
import LoaderReducers from '../Reducers/LoaderReducers';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['loginToken'],
};

const taskPersistConfig = {
  key: 'task',
  storage: AsyncStorage,
  whitelist: ['Task'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, TokenReducers),
  task: persistReducer(taskPersistConfig, TaskReducer),
  loader: LoaderReducers,
});

const axiosMiddleware = (store: any) => (next: any) => async (action: any) => {
    let token = store.getState()?.auth?.loginToken;

    if (!token) {
      token = await AsyncStorage.getItem('userToken');
    }


    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }

  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(axiosMiddleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
