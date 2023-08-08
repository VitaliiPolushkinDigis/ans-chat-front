import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  padding?: string;
}

export const classes = {
  box: 'box',
  title: 'title',
};

export const BoxWrapper = styled(Box)<Props>(({ padding }) => ({
  [`&.${classes.box}`]: {
    borderRadius: '15px',
    padding: padding ? padding : '12px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    boxShadow: 24,
  },
  [`&.${classes.title}`]: {},
}));
