import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { API_AC_TYPES } from '../utils/api';
import conversationsReducer from './conversationSlice';
import messageReducer from './messageSlice';
import testReducer from './testSlice';
import { ACPayload } from './types';

export type ThunkMiddleware<
  State = any,
  BasicAction extends Action = AnyAction,
  ExtraThunkArg = undefined,
> = Middleware<
  ThunkDispatch<State, ExtraThunkArg, BasicAction>,
  State,
  ThunkDispatch<State, ExtraThunkArg, BasicAction>
>;

function createApiMiddleware<
  State = any,
  BasicAction extends Action = AnyAction,
  ExtraThunkArg = undefined,
>(extraArgument?: ExtraThunkArg) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  const middleware: ThunkMiddleware<State, BasicAction, ExtraThunkArg> =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      // The thunk middleware looks for any functions that were passed to `store.dispatch`.
      // If this "action" is really a function, call it and return the result.
      if (typeof action === 'function') {
        console.log('yessss');

        // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
        return action(dispatch, getState, extraArgument);
      }

      // Otherwise, pass the action down the middleware chain as usual
      return next(action);
    };
  return middleware;
}

export const thunkMiddleware = createApiMiddleware() as ThunkMiddleware & {
  withExtraArgument<ExtraThunkArg, State = any, BasicAction extends Action = AnyAction>(
    extraArgument: ExtraThunkArg,
  ): ThunkMiddleware<State, BasicAction, ExtraThunkArg>;
};

thunkMiddleware.withExtraArgument = createApiMiddleware;

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    conversations: conversationsReducer,
    test: testReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
