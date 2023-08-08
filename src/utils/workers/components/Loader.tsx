import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  loader: {
    animation: 'spinner 1s linear forwards infinite',
  },

  '@keyframes spinner': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
}));

type Props = {
  color?: 'black' | 'white';
  size: number;
  display: 'inline-block' | 'block';
};

const Loader = ({ display, size, color }: Props) => (
  <Box
    style={{
      border: `4px solid ${color}`,
      width: `${size}px`,
      height: `${size}px`,
      borderRightColor: 'transparent',
      borderRadius: '50%',
      display,
      margin: display === 'block' ? '50px auto' : 'none',
    }}
    className="loader"
  ></Box>
);

export default Loader;
