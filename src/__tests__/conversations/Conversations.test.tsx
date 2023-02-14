import { waitFor } from '@testing-library/react';
import {
  fetchConversationsRequest,
  fetchConversationsSuccess,
  fetchConversationsThunk,
} from '../../store/conversationSlice';
import { ConversationType, User } from '../../utils/types';

const mockedUser: User = {
  id: 1,
  email: 'email@gmail.com',
  firstName: 'First',
  lastName: 'Last',
};

jest.mock('../../utils/api');

describe('loginThunk', () => {
  it('request call dispatch 2 times', async () => {
    const thunkMy = fetchConversationsThunk();
    const dispatchMock = jest.fn();

    await waitFor(() => thunkMy(dispatchMock));

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(fetchConversationsRequest());
    expect(dispatchMock).toHaveBeenCalledWith(fetchConversationsSuccess());
  });

  it('fetch conversations should return conversations array', async () => {
    const thunkMy = fetchConversationsThunk();
    const dispatchMock = jest.fn();

    const mockedResponse: ConversationType[] = [
      {
        id: 1,
        createdAt: '',
        creator: mockedUser,
        recipient: mockedUser,
      },
    ];

    await waitFor(() => {
      dispatchMock.mockReturnValue(mockedResponse);
      thunkMy(dispatchMock);
    });

    expect(dispatchMock.mock.results.slice(-1)[0].value).toBe(mockedResponse);
  });
});
//mock results
