import { Box } from '@mui/material';

export const MessageInputField = () => {
  return (
    <Box
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
        width: '100%',
        padding: '24px 32px',
      }}
    >
      <input
        style={{
          backgroundColor: 'inherit',
          outline: 'none',
          border: 'none',
          color: '#454545',
          fontFamily: 'Inter',
          boxSizing: 'border-box',
          fontSize: '18px',
          width: '100%',
          padding: '0',
          margin: '4px 0',
          resize: 'none',
        }}
      />
    </Box>
  );
};
