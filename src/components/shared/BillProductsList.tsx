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
import { useFormik } from 'formik';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import emptyBox from '@/assets/empty-box.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import {
  getAllCategoryCheckedProducts,
  getCategory1ProductsList,
  setCategory1CheckedProducts,
} from '@/store/Product/product.slice';
import { getDrawerState, toggleDrawer } from '@/store/drawer.slice';
import styled from 'styled-components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useSettings from '@/hooks/useSettings';
import { ListItem, ListItemText } from '@mui/material';

const BillProductsListRoot = styled.div`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[800]};
`;

const ProductListRoot = styled(Box)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[900]};
  width: 100%;
  height: calc(100vh - 13.7rem);
  overflow: auto;
`;

const ProductsListCard = styled(Card)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[800]};
`;

export type PopupProps = {
  products: any;
  userName: string;
};

export default function BillProductsList({ products, userName }: PopupProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { themeMode } = useSettings();
  const isLight = themeMode === 'light';

  const checkedProducts = useAppSelector(getAllCategoryCheckedProducts);
  const sideDrawerOpen = useAppSelector(getDrawerState);
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };
  const handleCheckboxRemove = (productId: number) => {
    dispatch(setCategory1CheckedProducts(productId));
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
  const productsList = useAppSelector(getCategory1ProductsList);
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
    <BillProductsListRoot>
      <Drawer anchor="bottom" open={sideDrawerOpen}>
        <Box sx={{ width: '100%', height: '100vh' }} role="presentation">
          <Box className="drawer-container">
            <Box display="flex" flex={1} justifyContent="end">
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
                <CloseIcon sx={{ color: isLight ? theme.palette.common.black : theme.palette.common.white }} />
              </IconButton>
            </Box>
            <Stack>
              <Typography variant="subtitle1">{userName}</Typography>
              {products.map((item) => {
                return (
                  <ListItem>
                    <ListItemText primary={item.productName} secondary={item.inputValue} />
                  </ListItem>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </BillProductsListRoot>
  );
}
