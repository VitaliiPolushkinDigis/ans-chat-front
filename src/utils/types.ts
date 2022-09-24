export type ConversationType = {
  id: string;
  name: string;
  lastMessage: string;
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
