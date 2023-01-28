import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../store/store';
import { AuthContext } from '../../utils/context/AuthContext';
import { ConversationType } from '../../utils/types';
import CreateNewConversationForm from '../forms/CreateNewConversationForm/CreateNewConversationForm';
import SimpleModal from '../modals/SimpleModal';
import ConversationCreateBtn from './ConversationCreateBtn/ConversationCreateBtn';

const ConversationSidebar: FC = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  const { conversations } = useTypedSelector((state) => state.conversations);

  const getDisplayUser = (conversation: ConversationType) => {
    return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator;
  };

  return (
    <Grid
      sx={{ position: 'fixed', top: '0', left: '0', height: '100vh', padding: '12px' }}
      width={'360px'}
      bgcolor={'#fafafa'}
    >
      <SimpleModal open={showModal} handleClose={() => setShowModal(false)} padding="20px">
        <CreateNewConversationForm />
      </SimpleModal>
      <h1>ConversationSidebar</h1>
      <Grid display="flex" justifyContent={'flex-end'}>
        <ConversationCreateBtn showModal={() => setShowModal(true)} />
      </Grid>
      {conversations.map((conversation) => (
        <Link
          style={{ textDecoration: 'none' }}
          key={conversation.id}
          to={`/conversations/${conversation.id}`}
        >
          <Box sx={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{ borderRadius: '50%', width: '36px', height: '36px', background: '#3a9' }}
            ></Box>
            <Box>
              <Typography>
                Write to:{' '}
                {`${getDisplayUser(conversation).firstName} ${
                  getDisplayUser(conversation).lastName
                }`}
              </Typography>
              <Typography>Creator: {conversation.creator.email}</Typography>
              <Typography>Recipient: {conversation.recipient.email}</Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

export default ConversationSidebar;
