import { FC } from 'react';
import { MessageType } from '../../utils/types';
import { MessageContainer } from './MessageContainer';
import { MessageInputField } from './MessageInputField';
import { MessagePanelHeader } from './MessagePanelHeader';

interface MessagePanelProps {
  messages: MessageType[];
}

const MessagePanel: FC<MessagePanelProps> = ({ messages }) => {
  return (
    <>
      <MessagePanelHeader />
      <MessageContainer messages={messages} />
      <MessageInputField />
    </>
  );
};

export default MessagePanel;
