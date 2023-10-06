import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Category1 from '@/features/Category1/Category1';
import { AppBar, Stack, IconButton } from '@mui/material';
import { TOP_BAR_HEIGHT, TOP_TAB_HEIGHT } from '@/config/Constants';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import ProductList from '@/components/shared/Drawer';
import { ProductsTypes } from '@/types/ProductCategory';
import { connect } from 'react-redux'; // Import connect from react-redux
import { useAppSelector } from '@/hooks/useAppSelector';
import { getDrawerState, toggleDrawer } from '@/store/drawer.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getCheckedProducts, getProductsList, getProductsListStatus } from '@/store/Product/product.slice';
import { fetchProductsList } from '@/store/Product/product.thunks';
import { request } from 'http';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
const CategoryRoot = styled(Box)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[900]};
  min-height: 100vh;
  .product_list_button {
    background-color: ${(props) =>
      props.theme.themeMode === 'light' ? props.theme.palette.primary.main : props.theme.palette.primary.main};
    .List_icon {
      color: ${(props) =>
        props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[900]};
    }
  }
  .Category_tab {
  }
  .MuiAppBar-root {
    background-color: ${(props) =>
      props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[800]};
    top: ${TOP_BAR_HEIGHT};
    border-bottom: 1px solid ${(props) => props.theme.palette.primary.light};
  }
`;
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1.5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function CategoryTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const tabPanelRefs = React.useRef([]);

  const productsList = useAppSelector(getProductsList);
  const productsListStatus = useAppSelector(getProductsListStatus);

  const currentClassListRequest = React.useMemo(() => ({}), []);

  const dispatch = useAppDispatch();

  const loadProductList = React.useCallback(() => {
    dispatch(fetchProductsList);
  }, [dispatch]);

  React.useEffect(() => {
    if (productsListStatus === 'idle') {
      loadProductList();
    }
    // console.log('datass::', classListData);
  }, [loadProductList]);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  React.useEffect(() => {
    const tabPanelElement = document.getElementById(`tabpanel-${value}`);
    if (tabPanelElement) {
      tabPanelElement.scrollTo(0, 0);
    }
  }, [value]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log('productsList', productsList);
  }, [productsList]);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const handleTabPanelRef = (ref, index: number) => {
    tabPanelRefs.current[index] = ref;
  };

  // const [products, setProducts] = React.useState<ProductsTypes[]>([
  //   { id: 1, productName: 'Apple', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 2, productName: 'Banana', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 3, productName: 'Orange', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 4, productName: 'Mango', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 5, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 6, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 7, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 8, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 9, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  //   { id: 10, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  // ]);

  // const checkedProducts = productsList.filter((product) => product.checked);
  return (
    <CategoryRoot>
      <Stack
        className="product_list_button"
        position="fixed"
        bottom={55}
        right={5}
        zIndex={1}
        borderRadius={50}
        boxShadow={5}
      >
        <IconButton color="primary" onClick={handleDrawerToggle}>
          <BallotRoundedIcon className="List_icon" fontSize="large" />
        </IconButton>
      </Stack>
      <AppBar position="fixed" sx={{ boxShadow: 0 }}>
        <Tabs
          className="Category_tab"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel ref={(ref) => handleTabPanelRef(ref, 0)} value={value} index={0} dir={theme.direction}>
          <Category1 />
        </TabPanel>
        <TabPanel ref={(ref) => handleTabPanelRef(ref, 2)} value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
      <ProductList />;
    </CategoryRoot>
  );
}

// const mapStateToProps = (state) => ({
//   products: state.products,
//   productListOpen: state.productListOpen,
// });

// // Define Redux actions
// const mapDispatchToProps = (dispatch) => ({
//   toggleProduct: (productId) => {
//     dispatch({ type: 'TOGGLE_PRODUCT', payload: { productId } });
//   },
//   updateProductInput: (productId, productCount) => {
//     dispatch({ type: 'UPDATE_PRODUCT_INPUT', payload: { productId, productCount } });
//   },
//   toggleProductList: (open) => {
//     dispatch({ type: 'TOGGLE_PRODUCT_LIST', payload: { open } });
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryTabs);
