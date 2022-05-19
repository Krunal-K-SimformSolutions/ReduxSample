import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { todoSauce } from './Reducers';

const persistConfig = {
  key: '@StoreSauce',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['todoSauce'], // Whitelist (Save Specific Reducers)
  blacklist: [] // Blacklist (Don't Save Specific Reducers)
};

const rootReducer = combineReducers({
  todoSauce
});

const middlewareList = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewareList.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, undefined, applyMiddleware(...middlewareList));

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

export default { store, persistor };
