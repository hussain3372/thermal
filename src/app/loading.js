import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box className="flex justify-center items-center h-screen">
      <CircularProgress size={60} thickness={4.5} />
    </Box>
  );
};

export default Loading;
