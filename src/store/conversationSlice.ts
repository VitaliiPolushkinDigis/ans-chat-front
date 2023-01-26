import { createSlice } from '@reduxjs/toolkit';
import { ConversationType } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { ACPayload } from './types';
import { API_AC_TYPES, getConversations } from '../utils/api';
export interface ConversationState {
  conversations: Map<number, ConversationType>;
  loading: boolean;
  error: boolean;
}

const initialState: ConversationState = {
  conversations: new Map(),
  loading: false,
  error: false,
};

export const fetchConversations = (): PayloadAction<ACPayload> => {
  return {
    type: `conversations/GET_CONVERSATIONS${API_AC_TYPES.REQUESTED}`,
    payload: {
      promise: () => getConversations(),
    },
  };
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      /*    state.conversations.push(action.payload);
      state.loading = false; */
    },
    GET_CONVERSATIONS_REQUESTED: (state, _action) => {
      state.loading = true;
    },
    GET_CONVERSATIONS_SUCCESSFUL: (state, action) => {
      action.payload.data.forEach((c: ConversationType) => state.conversations.set(c.id, c));
      state.loading = false;
      state.error = false;
    },
    GET_CONVERSATIONS_REJECTED: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;
