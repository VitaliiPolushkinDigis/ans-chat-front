import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  display: string;
  justifyContent: string;
  background: string;
}

const PREFIX = 'Page';

export const classes = {
  root: `${PREFIX}-page`,
};

export const Root = styled(Grid)<Props>(({ theme, background, display, justifyContent }) => ({
  [`&.${classes.root}`]: {
    display: display,
    justifyContent: justifyContent,
    minHeight: '100vh',
    background: background,
  },
}));
