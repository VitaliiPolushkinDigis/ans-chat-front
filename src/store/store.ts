import { configureStore, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { API_AC_TYPES } from '../utils/api';
import conversationsReducer from './conversationSlice';
import testReducer from './testSlice';
import { ACPayload } from './types';

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
export const useAppDispatch: () => AppDispatch = useDispatch;
