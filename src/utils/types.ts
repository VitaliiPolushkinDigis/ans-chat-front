export type ConversationType = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: Date | string;
};
export type CreateConversationParams = {
  recipientId: number;
  message: string;
};

export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};

export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export type UserCredentialsParams = {
  email: string;
  password: string;
};
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};

export type FetchMessagePayload = {
  id: number;
  messages: MessageType[];
};

export type MessageEventPayload = {
  id: number;
  createdAt: string;
  conversation: ConversationType;
  author: User;
  content: string;
};
export type CreateMessageParams = {
  content: string;
  conversationId: number;
};
export type UpdateMessageParams = {
  content: string;
  messageId: number;
};
