import { Typography, Box, Grid } from '@mui/material';
import { FC } from 'react';

interface PostProps {
  p: any;
}

const Post: FC<PostProps> = ({ p }) => {
  return (
    <Box style={{ paddingTop: '24px', paddingBottom: '24px' }}>
      <Typography fontWeight={700}>{p.title}</Typography>
      {p.imgUrl && <img style={{ maxWidth: '500px', borderRadius: '12px' }} src={p.imgUrl} />}
      <Typography>{p.subtitle}</Typography>
      <Typography fontWeight={200}>{p.description}</Typography>
      <Grid container justifyContent={'space-between'}>
        <Typography>Likes: {p.likes}</Typography>
        <Typography>Views: {p.views}</Typography>
      </Grid>
    </Box>
  );
};

export default Post;
