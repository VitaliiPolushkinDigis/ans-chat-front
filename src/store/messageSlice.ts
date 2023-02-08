import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_AC_TYPES, getConversationMessages } from '../utils/api';
import { ConversationMessage, MessageType } from '../utils/types';
import { ACPayload } from './types';

export interface MessageState {
  messages: ConversationMessage[];
  loading: boolean;
  error: boolean;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: false,
};

export const fetchMessages = (id: number): PayloadAction<ACPayload> => {
  return {
    type: `messages/GET_MESSAGES${API_AC_TYPES.REQUESTED}`,
    payload: {
      promise: () => getConversationMessages(id),
    },
  };
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ id: number; message: MessageType }>) => {
      const index = state.messages.findIndex((m) => m.id === action.payload.id);
      if (!!index) {
        state.messages[index].messages.push(action.payload.message);
      }
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
    GET_MESSAGES_REQUESTED: (state, action) => {
      state.loading = true;
    },
    GET_MESSAGES_REJECTED: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
