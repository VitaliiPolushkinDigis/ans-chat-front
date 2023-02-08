import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_AC_TYPES, getConversations } from '../utils/api';
import { ConversationType, FetchMessagePayload } from './../utils/types';
import { ACPayload } from './types';
export interface ConversationState {
  conversations: ConversationType[];
  messages: FetchMessagePayload[];
  loading: boolean;
  error: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: false,
  messages: [],
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
      state.conversations = action.payload.data;
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
