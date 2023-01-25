import { createSlice } from '@reduxjs/toolkit';
import { getTodo } from '../utils/api';
import { API_AC_TYPES } from './store';

const initialState = {
  test: 'initialValue',
  loading: false,
  error: false,
};

export const getTodoAC = (data: { id: string }) => {
  return {
    type: `test/GET_TODO${API_AC_TYPES.REQUESTED}`,
    payload: {
      data,
      promise: () => getTodo(data.id),
    },
  };
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    addTest: (state, action) => {
      state.loading = true;
    },
    GET_TODO_REQUESTED: (state, action) => {
      console.log('yo0', action);

      state.loading = true;
    },
    GET_TODO_SUCCESSFUL: (state, action) => {
      console.log('yo1');
      state.test = action.payload.data.title;
      state.loading = false;
      state.error = false;
    },
    GET_TODO_REJECTED: (state, action) => {
      console.log('yo2', action);
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addTest } = testSlice.actions;
export default testSlice.reducer;
