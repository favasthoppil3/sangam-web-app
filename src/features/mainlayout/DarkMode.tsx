import CircleButton from '@/components/shared/CircleButton';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import useSettings from '@/hooks/useSettings';
import { Box } from '@mui/material';

// export type SettingsButtonProps = Omit<ComponentProps<typeof CircleButton>, 'size' | 'children'>;

function SettingsButton() {
  const { themeMode, onToggleMode } = useSettings();

  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const { onClick } = props;

  // const open = Boolean(anchorEl);
  // const id = open ? 'settings-menu' : undefined;

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleToggleTheme = () => {
    onToggleMode();
  };

  return (
    // <CircleButton size="small" >
    <Box onClick={handleToggleTheme}>
      {themeMode === 'light' ? <MdOutlineDarkMode fontSize={20} /> : <MdOutlineLightMode fontSize={20} />}
    </Box>
    // </CircleButton>
  );
}

export default SettingsButton;
