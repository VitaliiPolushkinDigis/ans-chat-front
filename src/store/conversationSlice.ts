import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_AC_TYPES, getConversationMessages, getConversations } from '../utils/api';
import { ConversationType, FetchMessagePayload, MessageType } from './../utils/types';
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

export const fetchMessages = (id: number): PayloadAction<ACPayload> => {
  return {
    type: `conversations/GET_MESSAGES${API_AC_TYPES.REQUESTED}`,
    payload: {
      promise: () => getConversationMessages(id),
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
    GET_MESSAGES_SUCCESSFUL: (state, action) => {
      /* action.payload.data.forEach((c: ConversationType) => state.conversations.set(c.id, c)); */
      state.loading = false;
      state.error = false;

      const { id, messages } = action.payload.data;
      const index = state.messages.findIndex((cm) => cm.id === id);
      const exists = state.messages.find((cm) => cm.id === id);

      if (exists) {
        state.messages[index] = action.payload.data;
      } else {
        state.messages.push(action.payload.data);
      }
    },
    GET_MESSAGES_REJECTED: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;
