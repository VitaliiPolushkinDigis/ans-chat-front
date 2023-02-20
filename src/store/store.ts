import { Action, AnyAction, configureStore, Middleware, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import conversationsReducer from './conversationSlice';
import messageReducer from './messageSlice';
export type CustomMiddleware<
  State = any,
  BasicAction extends Action = AnyAction,
  ExtraArg = undefined,
> = Middleware<
  ThunkDispatch<State, ExtraArg, BasicAction>,
  State,
  ThunkDispatch<State, ExtraArg, BasicAction>
>;

function createApiMiddleware<
  State = any,
  BasicAction extends Action = AnyAction,
  ExtraArg = undefined,
>(extraArgument?: ExtraArg) {
  const middleware: CustomMiddleware<State, BasicAction, ExtraArg> =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
  return middleware;
}

export const customMiddleware = createApiMiddleware() as CustomMiddleware & {
  withExtraArgument<ExtraArg, State = any, BasicAction extends Action = AnyAction>(
    extraArgument: ExtraArg,
  ): CustomMiddleware<State, BasicAction, ExtraArg>;
};

customMiddleware.withExtraArgument = createApiMiddleware;

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    conversations: conversationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
