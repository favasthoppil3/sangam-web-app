import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';
import { ReactNode } from 'react';

export type DeleteMessageProps = {
  message: ReactNode;
};

export const DeleteMessage = ({ message }: DeleteMessageProps) => {
  const theme = useTheme();
  return (
    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[300],
          color: theme.palette.grey[600],
          p: 2,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          fontSize: 30,
        }}
      >
        <FaTrashAlt />
      </Box>
      <Typography variant="subtitle1" my={2} sx={{ color: theme.palette.error.main }}>
        {message}
      </Typography>
    </Stack>
  );
};
