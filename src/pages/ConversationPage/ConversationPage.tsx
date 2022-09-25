import { Typography } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationSidebar from '../../components/ConversationSidebar/ConversationSidebar';
import Page from '../../components/layouts/Page/Page';
import { getConversations } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { conversations } from '../../utils/mocks';
import { ConversationType } from '../../utils/types';

interface ConversationPageProps {}

const ConversationPage: FC<ConversationPageProps> = () => {
  const params = useParams();

  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        setConversations(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
