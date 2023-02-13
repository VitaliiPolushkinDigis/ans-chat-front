import { createSlice } from '@reduxjs/toolkit';
import { apiTodo, API_AC_TYPES, getTodo } from '../utils/api';

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
      promise: () => apiTodo(data.id),
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
      state.loading = true;
    },
    GET_TODO_SUCCESSFUL: (state, action) => {
      state.test = action.payload.data.title;
      state.loading = false;
      state.error = false;
    },
    GET_TODO_REJECTED: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addTest } = testSlice.actions;
export default testSlice.reducer;
