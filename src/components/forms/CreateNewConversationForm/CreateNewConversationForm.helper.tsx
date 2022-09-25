import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {}

export const classes = {
  title: `title`,
};

export const BoxWrapper = styled(Box)<Props>(() => ({
  [`&.${classes.title}`]: {
    marginTop: '16px',
  },
}));
