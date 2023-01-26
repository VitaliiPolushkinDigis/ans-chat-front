import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const classes = {
  title: 'title',
};

export const BoxWrapper = styled(Box)(() => ({
  [`&.${classes.title}`]: {
    marginTop: '16px',
  },
}));
