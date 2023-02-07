import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationMessage, MessageType } from '../utils/types';

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
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
