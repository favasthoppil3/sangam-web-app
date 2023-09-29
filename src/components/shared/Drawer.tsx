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
import styled, { keyframes } from 'styled-components';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CurrentDate from './DatePicker';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCheckedProducts } from '@/store/Product/product.slice';

type DrawerProps = {
  open: boolean;
  checkedProducts?: ProductsTypes[];
  onClose: () => void;
  Title?: String;
  inputValue?: number;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const DrawerRoot = styled.div`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[800]};
`;
const ProductListRoot = styled(Box)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[900]};
  width: 100%;
  height: calc(100vh - 11.3rem);
  overflow: auto;
  /* .MuiCard-root {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[800]};
  } */
`;

const ProductsListCard = styled(Card)`
  /* animation: ${fadeIn} 0.5s ease-in-out; */
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[800]};
`;
export default function ProductList({ open, checkedProducts, onClose }: DrawerProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleCheckboxRemove = (productId: number) => {
    dispatch(setCheckedProducts(productId));
    console.log('productId', productId);
  };

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
          <Box className="drawer-container">
            <Stack pt={2} px={2} direction="row" display="flex" alignItems="center" justifyContent="space-between">
              {checkedProducts.length !== 0 && (
                <Stack direction="row" alignItems="center" sx={{ color: theme.palette.grey[600] }} gap={1}>
                  <TodayOutlinedIcon fontSize="medium" />
                  <Typography variant="subtitle2" fontSize={16}>
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
                <PersonOutlineOutlinedIcon fontSize="large" />
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
          {checkedProducts.length === 0 && (
            <Box
              width="100%"
              sx={{ height: 'calc(100% - 100px)' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Stack flexDirection="column" alignItems="center">
                <img src={emptyBox} width={150} alt="" />
                <Typography variant="subtitle2" fontSize={16}>No data found.</Typography>
              </Stack>
            </Box>
          )}

          {checkedProducts.length !== 0 && (
            <ProductListRoot>
              <Grid container spacing={1} mt={1} mb={2}>
                {checkedProducts.map((product) => (
                  <Grid item lg={3} xs={12} key={product.id}>
                    <ProductsListCard sx={{ p: 2, mx: 2 }} className="">
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
                                color: product.inputValue === '0' ? theme.palette.error.light : '',
                                borderColor:
                                  product.inputValue === '0' ? theme.palette.error.light : theme.palette.primary.main,
                              }}
                            >
                              {product.inputValue}
                            </Typography>
                          )}
                          <IconButton size="small" onClick={() => handleCheckboxRemove(product.id)}>
                            <CloseIcon sx={{ color: theme.palette.error.main }} />
                          </IconButton>
                        </Stack>
                      </Box>
                    </ProductsListCard>
                  </Grid>
                ))}
              </Grid>
            </ProductListRoot>
          )}

          {checkedProducts.length !== 0 && (
            <Box width="100%" sx={{ display: 'flex', justifyContent: 'end' }} gap={2} py={2} px={2}>
              <Button
                onClick={onClose}
                variant="contained"
                sx={{ width: { xs: '100%', md: '10%' } }}
                size="large"
                color="secondary"
              >
                Cancel
              </Button>
              <Button variant="contained" size="large" color="primary" sx={{ width: { xs: '100%', md: '10%' } }}>
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </DrawerRoot>
  );
}
