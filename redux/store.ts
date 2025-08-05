import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';

import participants, {
  name as participantsName,
  ParticipantsSlice,
} from './slices/participantsSlices';
import nav, { name as navName } from './slices/navSlices';
import footer, { name as footerName } from './slices/footerSlices';
import { participantsSocketMiddleware } from '@/redux/middlewares/participants';

// import { api } from './services/api';

export function createStore(preloadedState?: ParticipantsSlice) {
  const store = configureStore({
    reducer: combineReducers({
      [participantsName]: participants,
      [navName]: nav,
      [footerName]: footer,
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
