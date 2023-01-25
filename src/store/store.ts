import {
  Action,
  applyMiddleware,
  configureStore,
  createListenerMiddleware,
  Dispatch,
  PayloadAction,
  Store,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { serviceApi } from '../utils/api';
import conversationsReducer from './conversationSlice';
import testReducer from './testSlice';
import { ACPayload } from './types';

export const API_AC_TYPES = {
  REQUESTED: '_REQUESTED',
  SUCCESSFUL: '_SUCCESSFUL',
  REJECTED: '_REJECTED',
};

const apiMiddleware = () => (next: Dispatch) => (action: PayloadAction<ACPayload>) => {
  if (action.type.includes(API_AC_TYPES.REQUESTED)) {
    next(action);
    action.payload
      .promise()
      .then((res: any) =>
        next({
          type: action.type.replace(API_AC_TYPES.REQUESTED, API_AC_TYPES.SUCCESSFUL),
          payload: res,
        }),
      )
      .catch((err: Error) =>
        next({
          type: action.type.replace(API_AC_TYPES.REQUESTED, API_AC_TYPES.REJECTED),
          payload: err,
        }),
      );
  } else {
    return next(action);
  }
};

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    test: testReducer,
  },
  middleware: [apiMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
