import { createSlice } from '@reduxjs/toolkit';
import { ConversationType } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
export interface ConversationState {
  conversations: ConversationType[];
}

const initialState: ConversationState = {
  conversations: [],
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversations.push(action.payload);
    },
  },
});

export const { addConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;
