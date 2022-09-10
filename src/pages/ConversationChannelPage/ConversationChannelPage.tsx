import { Grid } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ConversationChannelPageProps {}

const ConversationChannelPage: FC<ConversationChannelPageProps> = () => {
  const params = useParams();

  return <Grid sx={{ marginLeft: '360px' }}>ConversationChannel {params.id}</Grid>;
};

export default ConversationChannelPage;
