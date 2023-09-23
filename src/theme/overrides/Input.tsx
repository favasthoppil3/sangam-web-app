import { Components, Theme } from '@mui/material';

export default function Input(theme: Theme): Components<Theme> {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px!important',
            borderColor: theme.palette.secondary.light,
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
            ':hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            outline: 0,
            // boxShadow: '0 0 0 .25rem #2dd4bf',
          },
          ':hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },

          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.dark,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline:hover': {
            borderColor: theme.palette.error.dark,
          },
        },
        input: {
          padding: '0.45rem 0.875rem',
        },
        inputSizeSmall: {
          padding: '0.5rem 0.875rem',
        },
      },
    },
  };
}
