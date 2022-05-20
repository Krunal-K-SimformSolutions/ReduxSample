import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { reducerToolkit } from './Reducers';

const persistConfig = {
  key: '@StoreToolkit',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['reducerToolkit'], // Whitelist (Save Specific Reducers)
  blacklist: [] // Blacklist (Don't Save Specific Reducers)
};

const rootReducer = combineReducers({
  reducerToolkit
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareList = [
  ...getDefaultMiddleware({
    thunk: true,
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
