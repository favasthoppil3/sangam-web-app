import { Components, Theme } from '@mui/material';

export default function Accordion(theme: Theme): Components<Theme> {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
          '&.Mui-expanded': {
            minHeight: '20px',
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
        content: {
          '&.Mui-expanded': {
            margin: '10px 0',
          },
        },
      },
    },
  };
}
