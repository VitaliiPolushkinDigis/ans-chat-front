import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ConversationType } from '../../utils/types';

interface ConversationSidebarProps {
  conversations: ConversationType[];
}

const ConversationSidebar: FC<ConversationSidebarProps> = ({ conversations }) => {
  return (
    <Grid
      sx={{ position: 'fixed', top: '0', left: '0', height: '100vh', padding: '12px' }}
      width={'360px'}
      bgcolor={'#fafafa'}
    >
      <h1>ConversationSidebar</h1>
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
              <Typography>{conversation.name}</Typography>
              <Typography>{conversation.lastMessage}</Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

export default ConversationSidebar;
