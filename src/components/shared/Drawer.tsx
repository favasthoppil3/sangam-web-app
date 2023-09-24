import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import {
  Box,
  OutlinedInput,
  Typography,
  Stack,
  IconButton,
  ListItem,
  ListItemText,
  List,
  FormControl,
  useTheme,
  Card,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { ProductsTypes } from '@/types/ProductCategory';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import emptyBox from '@/assets/empty-box.png';
import styled from 'styled-components';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CurrentDate from './DatePicker';

type DrawerProps = {
  open: boolean;
  checkedProducts?: ProductsTypes[];
  onClose: () => void;
  Title?: String;
  inputValue?: number;
};

const DrawerRoot = styled(Box)``;
const ProductListRoot = styled(Box)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[800]};

  width: 100%;
  height: calc(100vh - 10.45rem);
  overflow: auto;
`;
export default function ProductList({ open, checkedProducts, inputValue, onClose, Title }: DrawerProps) {
  const theme = useTheme();

  const [currentDayOfWeek, setCurrentDayOfWeek] = React.useState('');
  const [currentDate, setCurrentDate] = React.useState('');

  React.useEffect(() => {
    const date = new Date();
    const dateOption = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const options = { weekday: 'long' };
    const currentDayOfWeek = date.toLocaleString('en-US', options);
    const currentDate = date.toLocaleString(dateOption);
    setCurrentDate(currentDate);
    setCurrentDayOfWeek(currentDayOfWeek);
  }, []);

  return (
    <DrawerRoot>
      <Drawer anchor="right" open={open}>
        <Box sx={{ width: '100vw', height: '100%' }} role="presentation">
          <Box >
            <Stack pt={2} px={2} direction="row" display="flex" alignItems="center" justifyContent="space-between">
              {checkedProducts.length !== 0 && (
                <Stack direction="row" alignItems="center" sx={{ color: theme.palette.grey[600] }} gap={1}>
                  <TodayOutlinedIcon />
                  <Typography variant="subtitle2">
                    {currentDate}&nbsp;-&nbsp;{currentDayOfWeek}
                  </Typography>
                  {/* <CurrentDate /> */}
                </Stack>
              )}
              <Box display="flex" flex={1} justifyContent="end">
                <Stack>
                  <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                      p: 1,
                      color: theme.palette.grey[500],
                      '&:hover': {
                        transition: '100ms',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
            {checkedProducts.length !== 0 && (
              <Stack
                my={2}
                px={2}
                flexDirection="row"
                alignItems="center"
                sx={{ color: theme.palette.grey[600] }}
                gap={1}
              >
                <PersonOutlineRoundedIcon />
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Enter Name"
                    fullWidth
                    sx={{ fontFamily: 'Poppins Regular' }}
                  />
                </FormControl>
              </Stack>
            )}
          </Box>
          <ProductListRoot>
            {checkedProducts.length === 0 && (
              <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                <Stack flexDirection="column" alignItems="center">
                  <img src={emptyBox} width={100} alt="" />
                  <Typography variant="subtitle2">No data found.</Typography>
                </Stack>
              </Box>
            )}

            {checkedProducts.length !== 0 && (
              <Grid container spacing={1} mt={1} mb={2}>
                {checkedProducts.map((product) => (
                  <Grid item lg={3} xs={12} key={product.id}>
                    <Card sx={{ p: 2, mx: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Stack display="flex" sx={{ flexWrap: 'nowrap' }}>
                          <Typography variant="subtitle2" fontSize={18}>
                            {product.productName}
                          </Typography>
                        </Stack>
                        <Stack flexDirection="row" alignItems="center" gap={5}>
                          {product.inputValue === '' ? (
                            <Typography
                              border={2}
                              borderColor={theme.palette.error.light}
                              px={2}
                              borderRadius={1}
                              variant="subtitle2"
                              sx={{ color: theme.palette.error.light }}
                            >
                              0
                            </Typography>
                          ) : (
                            <Typography
                              border={2}
                              borderColor={theme.palette.primary.main}
                              px={2}
                              borderRadius={1}
                              variant="subtitle2"
                              sx={{
                                color:
                                  product.inputValue === '0' ? theme.palette.error.light : theme.palette.common.black,
                                borderColor:
                                  product.inputValue === '0' ? theme.palette.error.light : theme.palette.primary.main,
                              }}
                            >
                              {product.inputValue}
                            </Typography>
                          )}
                          <IconButton size="small">
                            <CloseIcon sx={{ color: theme.palette.error.main }} />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </ProductListRoot>
          {checkedProducts.length !== 0 && (
            <Box display="flex" gap={2} alignItems="center" justifyContent="flex-end" py={2} px={2}>
              <Button onClick={onClose} variant="contained" color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </DrawerRoot>
  );
}
