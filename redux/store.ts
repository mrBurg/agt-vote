import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';

import {
  type ParticipantsProps,
  navName,
  navReducer,
  participantsName,
  participantsReducer,
  footerName,
  footerReducer,
  clientName,
  clientReducer,
} from './slices';
import { participantsSocketMiddleware } from './middlewares';

// import { api } from './services/api';

export function createStore(preloadedState?: ParticipantsProps) {
  const store = configureStore({
    reducer: combineReducers({
      [participantsName]: participantsReducer,
      [navName]: navReducer,
      [footerName]: footerReducer,
      [clientName]: clientReducer,
      // [api.reducerPath]: api.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        participantsSocketMiddleware /* api.middleware */
      ),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  // setupListeners(store.dispatch);

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
