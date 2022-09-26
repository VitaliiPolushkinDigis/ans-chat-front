import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessagePanel from '../../components/messages/MessagePanel';
import { getConversationMessages } from '../../utils/api';
import { MessageType } from '../../utils/types';

interface ConversationChannelPageProps {}

const ConversationChannelPage: FC<ConversationChannelPageProps> = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Grid sx={{ marginLeft: '360px', height: '100vh' }}>
      {' '}
      <MessagePanel messages={messages}></MessagePanel>
    </Grid>
  );
};

export default ConversationChannelPage;
