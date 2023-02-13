import { waitFor } from '@testing-library/react';
import {
  fetchConversationsRequest,
  fetchConversationsSuccess,
  fetchConversationsThunk,
} from '../../store/conversationSlice';
import { getConversations } from '../../utils/api';

jest.mock('../../utils/api');

describe('loginThunk', () => {
  it('test', async () => {
    const thunkMy = fetchConversationsThunk();
    const dispatchMock = jest.fn();

    await waitFor(() => thunkMy(dispatchMock));

    console.log('dispatchMock,dispatchMock', dispatchMock, 'result', dispatchMock.mock.results);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(fetchConversationsRequest());
    expect(dispatchMock).toHaveBeenCalledWith(fetchConversationsSuccess());
  });
});
//mock results
