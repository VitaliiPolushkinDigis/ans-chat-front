import { Grid } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessagePanel from '../../components/messages/MessagePanel';
import { addMessage, fetchMessages } from '../../store/messageSlice';
import { useAppDispatch, useTypedSelector } from '../../store/store';
import { getConversationMessages } from '../../utils/api';
import { SocketContext } from '../../utils/context/SocketContext';
import { MessageEventPayload, MessageType } from '../../utils/types';

interface ConversationChannelPageProps {}

const ConversationChannelPage: FC<ConversationChannelPageProps> = () => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessages(conversationId));
  }, [id]);

  useEffect(() => {
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received');
      const { conversation, ...message } = payload;
      //add new message to corresponding conversation messages
      setMessages((prev) => [message, ...prev]);
      dispatch(addMessage({ id: parseInt(id!), message }));
    });
    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, []);

  return (
    <Grid sx={{ marginLeft: '360px', height: '100vh' }}>
      <MessagePanel messages={messages}></MessagePanel>
    </Grid>
  );
};

export default ConversationChannelPage;
