import { Typography } from '@mui/material';
import { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationSidebar from '../../components/ConversationSidebar/ConversationSidebar';
import Page from '../../components/layouts/Page/Page';
import { conversations } from '../../utils/mocks';

interface ConversationPageProps {}

const ConversationPage: FC<ConversationPageProps> = () => {
  const params = useParams();
  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
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
