import { Button } from '@mui/material';
import { FC } from 'react';
import { usePostConversationMutation } from '../../utils/services/api';
import { User } from '../../utils/types';

interface UserProps {
  user: User;
}

const UserComponent: FC<UserProps> = ({ user }) => {
  const [postConversation] = usePostConversationMutation();

  const onClick = () => {
    postConversation({ recipientId: user.id!, message: 'YO!' });
  };
  return (
    <div>
      {user.firstName} {user.lastName}
      <Button onClick={() => onClick()}>Send Message</Button>
    </div>
  );
};

export default UserComponent;
