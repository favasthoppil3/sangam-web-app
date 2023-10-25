import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { InputSelectIcon } from './CustomIcons';

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDropDownRoundedIcon,
      },
      styleOverrides: {
        root: {
          width: '10px  ',
        },
      },
      MuiSelectIcon: {
        styleOverrides: {
          root: { fontSize: '10.875rem' },
        },
      },
    },
  };
}
