import { Box, Button } from '@mui/material';
import { Dispatch, FC, FormEvent, SetStateAction } from 'react';

interface MessageInputFieldProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: (e: FormEvent<HTMLFormElement>) => void;
}

export const MessageInputField: FC<MessageInputFieldProps> = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <Box
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
        width: '100%',
        padding: '24px 32px',
      }}
    >
      <form onSubmit={sendMessage} style={{ display: 'flex' }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            backgroundColor: 'inherit',
            outline: 'none',
            border: 'none',
            color: '#454545',
            fontFamily: 'Inter',
            boxSizing: 'border-box',
            fontSize: '18px',
            width: '100%',
            padding: '0',
            margin: '4px 0',
            resize: 'none',
          }}
          data-attr="msg-input"
        />
        <Button data-attr="send-btn" type="submit" color="primary" variant="contained">
          Send
        </Button>
      </form>
    </Box>
  );
};
