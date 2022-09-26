import { formatRelative } from 'date-fns';
import { Box, Grid } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { MessageType, User } from '../../utils/types';

type Props = {
  messages: MessageType[];
};

type FormattedMessageProps = {
  user?: User;
  message: MessageType;
};
export const FormattedMessage: FC<FormattedMessageProps> = ({ user, message }) => {
  console.log('call it', message.content, message.id);

  return (
    <Grid
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '5px 0',
      }}
    >
      <Box
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#ee4343',
        }}
      />
      <Box>
        <Grid
          style={{
            display: 'flex',
            gap: '12px',
          }}
        >
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? '#757575' : '#5E8BFF',
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">{formatRelative(new Date(message.createdAt), new Date())}</span>
        </Grid>
        <Box>{message.content}</Box>
      </Box>
    </Grid>
  );
};

export const MessageContainer: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext);

  const formatMessages = () => {
    //CHECK IT
    if (messages) {
      console.log('here');

      if (messages.length) {
        console.log('there');
        return messages.map((m, index, arr) => {
          const nextIndex = index + 1;
          const currentMessage = arr[index];
          const nextMessage = arr[nextIndex];

          if (arr.length === nextIndex) return <FormattedMessage user={user} message={m} />;

          if (currentMessage.author.id === nextMessage.author.id) {
            return (
              <Grid
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '5px 0',
                }}
              >
                <Box padding="0 0 0 70px">{m.content}</Box>
              </Grid>
            );
          }
          return <FormattedMessage user={user} message={m} />;
        });
      }
    }
  };

  useEffect(() => {
    formatMessages();
  });

  return (
    <Grid
      style={{
        height: 'calc(100% - 100px)',
        boxSizing: 'border-box',
        padding: ' 10px 0',
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'scroll',

        /*  &::-webkit-scrollbar {
    display: none;
  } */
      }}
    >
      {formatMessages()}
    </Grid>
  );
};
