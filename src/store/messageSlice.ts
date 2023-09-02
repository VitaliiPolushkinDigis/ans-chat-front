import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { API_AC_TYPES, getConversationMessages } from '../utils/api';
import { ConversationMessage, MessageEventPayload, MessageType } from '../utils/types';
import { RootState } from './store';

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

export const fetchMessages = (id: number) => {
  return async (dispatch: Dispatch, getState?: () => RootState) => {
    try {
      dispatch({ type: `conversations/GET_MESSAGES${API_AC_TYPES.REQUESTED}` });
      const conv = await getConversationMessages(id);
      dispatch({
        type: `messages/GET_MESSAGES_SUCCESSFUL`,
        payload: conv,
      });
    } catch (error) {
      dispatch({
        type: `messages/GET_CONVERSATIONS${API_AC_TYPES.REJECTED}`,
        payload: error,
      });
    }
  };
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, ...message } = action.payload;
      const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
      conversationMessage?.messages.unshift(message);
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
