// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './user/userSlice';
// import apiSlice from '../api/apiSlice';
// import storage from 'redux-persist/lib/storage';
// import unionSlice from './union/unionSlice';
// import applicantReducer from './application/applicantSlice';

// const persistConfig = {
//   key: 'auth',
//   storage,
// };

// const persistedAuthReducer = persistReducer(persistConfig, userSlice);
// const persistedUnionReducer = persistReducer(persistConfig, unionSlice);

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     user: persistedAuthReducer,
//     union: persistedUnionReducer,
//     applicant: applicantReducer,
//   },

//   middleware: getDefaultMiddlewares =>
//     getDefaultMiddlewares({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(apiSlice.middleware),
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import apiSlice from "../api/apiSlice";
import storage from "redux-persist/lib/storage";
import unionSlice from "./union/unionSlice";
import applicantReducer from "./application/applicantSlice";
import informationsReducer from "./nidInfo/informationsSlice";

// Persist configuration for auth and union
const authPersistConfig = {
  key: "auth",
  storage,
};

const unionPersistConfig = {
  key: "union",
  storage,
};

// Persist configuration for applicant
const applicantPersistConfig = {
  key: "applicant",
  storage,
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, userSlice);
const persistedUnionReducer = persistReducer(unionPersistConfig, unionSlice);
const persistedApplicantReducer = persistReducer(
  applicantPersistConfig,
  applicantReducer
);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: persistedAuthReducer,
    union: persistedUnionReducer,
    applicant: persistedApplicantReducer, // Persisted applicant reducer
    informations: informationsReducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
