import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#eee',
    borderRadius: '15px',
    padding: '45px 30px',
    height: '100%',
    position: 'relative',
  },
  registerForm: {
    '& > div': {
      marginBottom: '16px',
    },
  },
}));
