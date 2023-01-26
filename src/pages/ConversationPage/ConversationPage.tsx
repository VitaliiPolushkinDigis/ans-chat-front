import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationSidebar from '../../components/ConversationSidebar/ConversationSidebar';
import Page from '../../components/layouts/Page/Page';
import { fetchConversations } from '../../store/conversationSlice';
import { useAppDispatch, useTypedSelector } from '../../store/store';

interface ConversationPageProps {}

const ConversationPage: FC<ConversationPageProps> = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { conversations } = useTypedSelector((state) => state.conversations);

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  console.log('sdf');

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
