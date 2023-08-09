import {
  Action,
  AsyncThunkAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import { persistConfigRoot } from './config';

let debuggerFlipper: any;

const persistedReducer = persistReducer(
  persistConfigRoot,
  rootReducer,
) as typeof rootReducer;

const createDebugger = require('redux-flipper').default;
debuggerFlipper = createDebugger();
export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    if (debuggerFlipper) {
      middleware.push(debuggerFlipper);
    }
    return middleware;
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof persistedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppAsyncThunkAction = ReturnType<AsyncThunkAction<any, any, any>>;
