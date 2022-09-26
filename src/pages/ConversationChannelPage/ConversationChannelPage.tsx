import { Grid } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessagePanel from '../../components/messages/MessagePanel';
import { getConversationMessages } from '../../utils/api';
import { SocketContext } from '../../utils/context/SocketContext';
import { MessageType } from '../../utils/types';

interface ConversationChannelPageProps {}

const ConversationChannelPage: FC<ConversationChannelPageProps> = () => {
  const socket = useContext(SocketContext);
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

  useEffect(() => {
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (payload: any) => {
      console.log('payload', payload);
    });

    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, []);

  /*   if (messages && !messages.length) {
    return <div>error</div>;
  } */

  return (
    <Grid sx={{ marginLeft: '360px', height: '100vh' }}>
      {' '}
      <MessagePanel messages={messages}></MessagePanel>
    </Grid>
  );
};

export default ConversationChannelPage;
