import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationSidebar from '../../components/ConversationSidebar/ConversationSidebar';
import Page from '../../components/layouts/Page/Page';
import { fetchConversationsThunk } from '../../store/conversationSlice';
import { useAppDispatch, useTypedSelector } from '../../store/store';

const ConversationPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { conversations } = useTypedSelector((state) => state.conversations);

  useEffect(() => {
    const data = dispatch(fetchConversationsThunk());
  }, []);

  return (
    <Page>
      <ConversationSidebar />
      {!params.id && (
        <Typography sx={{ marginLeft: '360px' }}>
          Select the chat to see the conversation
        </Typography>
      )}
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
