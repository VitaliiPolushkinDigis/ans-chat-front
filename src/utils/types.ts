import { Sex } from './workers/longProcesses/enums';

export type ConversationType = {
  id: number;
  creator: UserWithoutPassword;
  recipient: UserWithoutPassword;
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

/* export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}; */
export type UserCredentialsParams = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileId: number;
  sex?: Sex;
};

type ExcludeField<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

export type UserWithoutPassword = ExcludeField<User, 'password'>;

type OmitFields<T, K extends keyof T> = Required<Pick<T, Exclude<keyof T, K>>> &
  Partial<Pick<T, K>>;

export type CreateUserParams = OmitFields<User, 'id' | 'profileId'>;

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
