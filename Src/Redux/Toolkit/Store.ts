import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { reducerToolkit } from './Reducers';

const storage = new MMKV();
const ReduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  }
};

const persistConfig = {
  key: '@StoreToolkit',
  version: 1,
  storage: ReduxStorage,
  whitelist: ['reducerToolkit'], // Whitelist (Save Specific Reducers)
  blacklist: [] // Blacklist (Don't Save Specific Reducers)
};

const rootReducer = combineReducers({
  reducerToolkit
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareList = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewareList.push(createDebugger());
}

const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: middlewareList
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

// Enable persistence
export default { store, persistor };
