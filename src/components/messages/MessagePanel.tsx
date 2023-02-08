import { FC, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postNewMessage } from '../../utils/api';
import { MessageType } from '../../utils/types';
import { MessageContainer } from './MessageContainer';
import { MessageInputField } from './MessageInputField';
import { MessagePanelHeader } from './MessagePanelHeader';

interface MessagePanelProps {}

const MessagePanel: FC<MessagePanelProps> = ({}) => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !message) return;
    try {
      postNewMessage({ conversationId: parseInt(id), content: message });
    } catch (error) {
      console.log('err', error);
    }

    console.log('send', message);
    setMessage('');
  };
  return (
    <>
      <MessagePanelHeader />
      <MessageContainer />
      <MessageInputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </>
  );
};

export default MessagePanel;
