import {
  Action,
  AsyncThunkAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import { persistConfigRoot } from './config';


const persistedReducer = persistReducer(
  persistConfigRoot,
  rootReducer,
) as typeof rootReducer;

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
    });
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
