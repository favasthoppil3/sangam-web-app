import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack, useTheme } from '@mui/material';
import { TOP_BAR_HEIGHT } from '@/config/Constants';
import SettingsButton from './DarkMode';

const NavbarRoot = styled(Box)``;
export default function Navbar() {
  const theme = useTheme();
  return (
    <NavbarRoot sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          backgroundColor: theme.palette.primary.main,
          height: TOP_BAR_HEIGHT,
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack>
            <Typography sx={{ fontFamily: 'Poppins Regular' }} variant="h6">
              Sangam
            </Typography>
          </Stack>

          <SettingsButton />
        </Toolbar>
      </AppBar>
    </NavbarRoot>
  );
}
