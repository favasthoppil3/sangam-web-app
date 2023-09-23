import { Components, Theme } from '@mui/material';

export default function Button(theme: Theme): Components<Theme> {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          borderRadius: 20,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme.customShadows.primary,
          },
          '&.MuiLoadingButton-root.Mui-disabled': {
            backgroundColor: 'rgb(255,197,164)',
            color: '#5e5d5d',
          },
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.light,
          boxShadow: 'none',
          color: theme.palette.grey[800],
          '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            boxShadow: theme.customShadows.secondary,
          },
        },

        containedInfo: {
          boxShadow: theme.customShadows.info,
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success,
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning,
        },
        containedError: {
          boxShadow: theme.customShadows.error,
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
