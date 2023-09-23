import { TypographyOptions } from '@mui/material/styles/createTypography';

const FONT_PRIMARY = '"Poppins Regular", sans-serif';
const FONT_BUTTON = '"Poppins SemiBold", sans-serif';

const typography: TypographyOptions = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  button: {
    fontFamily: FONT_BUTTON,
    fontWeight: 'normal',
    textTransform: 'none' as any,
  },
};

export default typography;
