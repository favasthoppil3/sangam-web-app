import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import useTheme from '@mui/material/styles/useTheme';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import emptyBox from '@/assets/empty-box.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { getCheckedProducts, getProductsList, setCheckedProducts } from '@/store/Product/product.slice';
import { getDrawerState, toggleDrawer } from '@/store/drawer.slice';
import styled from 'styled-components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

const DrawerRoot = styled.div`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[800]};
`;

const ProductListRoot = styled(Box)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[900]};
  width: 100%;
  height: calc(100vh - 13.3rem);
  overflow: auto;
`;

const ProductsListCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[800]};
`;

export default function ProductList() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const checkedProducts = useAppSelector(getCheckedProducts);
  const sideDrawerOpen = useAppSelector(getDrawerState);
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };
  const handleCheckboxRemove = (productId: number) => {
    dispatch(setCheckedProducts(productId));
    console.log('productId', productId);
  };
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const date = new Date();
    const dateOption = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const options = { weekday: 'long' };
    const currentDayOfWeek = date.toLocaleString('en-US', options);
    const currentDate = date.toLocaleString(dateOption);
    setCurrentDate(currentDate);
    setCurrentDayOfWeek(currentDayOfWeek);
  }, []);
  const productsList = useAppSelector(getProductsList);
  const formik = useFormik({
    initialValues: {
      name: '',
      place: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.place) {
        errors.place = 'Place is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      setLoading(true);
      const existingArray = JSON.parse(localStorage.getItem('myArray')) || [];
      const newEntry = {
        id: Math.floor(Math.random() * 100000),
        currentDate: [currentDate],
        name: values.name,
        place: values.place,
        products: checkedProducts,
      };
      existingArray.push(newEntry);
      localStorage.setItem('myArray', JSON.stringify(existingArray));
      setTimeout(() => {
        setLoading(false);
        formik.resetForm(); // Reset form on drawer close
        handleDrawerToggle();
      }, 2000);
    },
  });
  const handleDrawerClose = () => {
    formik.resetForm(); // Reset form on drawer close
    handleDrawerToggle();
  };
  return (
    <DrawerRoot>
      <Drawer anchor="right" open={sideDrawerOpen}>
        <Box sx={{ width: '100vw', height: '100%' }} role="presentation">
          <Box className="drawer-container">
            <Stack pt={2} px={2} direction="row" display="flex" alignItems="center" justifyContent="space-between">
              {checkedProducts.length !== 0 && (
                <Stack direction="row" alignItems="center" sx={{ color: theme.palette.grey[600] }} gap={1}>
                  <TodayOutlinedIcon fontSize="medium" />
                  <Typography variant="subtitle2" fontSize={15}>
                    {currentDate}&nbsp;-&nbsp;{currentDayOfWeek}
                  </Typography>
                </Stack>
              )}
              <Box display="flex" flex={1} justifyContent="end">
                <Stack>
                  <IconButton
                    aria-label="close"
                    onClick={handleDrawerClose}
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
              <Stack my={1} px={2} spacing={1} flexDirection="column" sx={{ color: theme.palette.grey[600] }} gap={1}>
                <Stack flexDirection="row" gap={1}>
                  <PersonOutlineOutlinedIcon fontSize="medium" />
                  <FormControl fullWidth>
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder={formik.touched.name && formik.errors.name ? formik.errors.name : 'Enter Name'}
                      fullWidth
                      {...formik.getFieldProps('name')}
                      error={formik.touched.name && formik.errors.name ? true : false}
                      // helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                      sx={{ fontFamily: 'Poppins Regular' }}
                    />
                  </FormControl>
                </Stack>
                <Stack flexDirection="row" gap={1}>
                  <PlaceOutlinedIcon fontSize="medium" />
                  <FormControl fullWidth>
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder={formik.touched.place && formik.errors.place ? formik.errors.place : 'Enter Place'}
                      fullWidth
                      {...formik.getFieldProps('place')}
                      error={formik.touched.place && formik.errors.place ? true : false}
                      // helperText={formik.touched.place && formik.errors.place ? formik.errors.place : ''}
                      sx={{ fontFamily: 'Poppins Regular' }}
                    />
                  </FormControl>
                </Stack>
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
                <Typography variant="subtitle2" fontSize={16}>
                  No data found.
                </Typography>
              </Stack>
            </Box>
          )}
          {checkedProducts.length !== 0 && (
            <ProductListRoot>
              <Grid container spacing={1} mt={1} mb={2}>
                {checkedProducts.map((product) => (
                  <Grid item lg={3} xs={12} key={product.id}>
                    <ProductsListCard sx={{ px: 2, py: 1, mx: 2 }} className="">
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Stack display="flex" sx={{ flexWrap: 'nowrap' }}>
                          <Typography variant="subtitle2" fontSize={16}>
                            {product.productName}
                          </Typography>
                        </Stack>
                        <Stack flexDirection="row" alignItems="center" gap={5}>
                          {product.inputValue === '' ? (
                            <Typography
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
                              borderColor={
                                product.inputValue === '0' ? theme.palette.error.light : theme.palette.primary.main
                              }
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
                onClick={handleDrawerClose}
                variant="contained"
                sx={{ width: { xs: '100%', md: '10%' } }}
                size="large"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ width: { xs: '100%', md: '10%' } }}
                onClick={formik.handleSubmit}
                disabled={loading || formik.errors.name || formik.errors.place}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </DrawerRoot>
  );
}
