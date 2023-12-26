import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import rootReducer from './filter/filter';
import loginReducer from './login/asscess';
import searchAdminReducer from './sreach/filFrom';
import addCartReducer from './cart/cartRedux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['loginReducer']
}

const rootReducers = combineReducers({
  counter: counterReducer,
  rootReducer: rootReducer,
  loginReducer: loginReducer,
  searchAdminReducer: searchAdminReducer,
  addCartReducer: addCartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export { store, persistor }
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     rootReducer: rootReducer,
//     loginReducer: loginReducer,
//     searchAdminReducer: searchAdminReducer
//   },
// });
