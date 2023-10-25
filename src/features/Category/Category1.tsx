import { TOP_BAR_HEIGHT, TOP_TAB_HEIGHT } from '@/config/Constants';
import {
  AppBar,
  Box,
  Card,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  getCategory1ProductsList,
  getProductsListStatus,
  setCategory1CheckedProducts,
  setCategory1InputValues,
} from '@/store/Product/product.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

const Category1Root = styled(Box)`
  margin-top: calc(${TOP_TAB_HEIGHT} + ${TOP_BAR_HEIGHT});
`;

interface ProductNameProps {
  checked: boolean;
}
// interface TextBoxProps {
//   inputDisabled: boolean;
//   type: string;
//   sx: any;
//   id: string;
//   disabled: boolean;
// }
const ProductName = styled(Typography)<ProductNameProps>`
  /* text-decoration: line-through; */
  /* text-decoration-color: ${(props) => props.theme.palette.primary.main}; */
  color: ${(props) => props.theme.palette.grey[600]};
  ${({ checked }) =>
    checked &&
    css`
      color: ${(props) => props.theme.palette.primary.main};
      /* text-decoration: none; */
    `}
`;

// const TextBox = styled(OutlinedInput)<TextBoxProps>`
//   /* border: .0625rem solid ${(props) => props.theme.palette.primary.main}; */
//   ${({ inputDisabled }) =>
//     inputDisabled &&
//     css`
//       /* border: .0625rem solid ${(props) => props.theme.palette.primary.main}; */
//     `}
// `;

export default function Category1() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(getCategory1ProductsList);

  const handleCheckboxChange = (productId: number) => {
    dispatch(setCategory1CheckedProducts(productId));
  };

  const handleInputChange = (productId: number, productCount: string) => {
    if (/^\d{0,4}$/.test(productCount)) {
      dispatch(setCategory1InputValues({ productId, productCount }));
    }
    // updateProductInput(productId, productCount); // Dispatch the updateProductInput action
  };

  // const handleInputChange = (productId: number, productCount: string) => {
  //   if (/^\d{0,4}$/.test(productCount)) {
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) => (product.id === productId ? { ...product, inputValue: productCount } : product))
  //     );
  //   }
  // };
  const productsListStatus = useAppSelector(getProductsListStatus);
  let BodyContent: ReactNode = null;

  if (productsListStatus === 'loading') {
    BodyContent = Array.from({ length: 4 }).map((_, index) => (
      <Grid item lg={3} xs={12} key={index}>
        <Card sx={{ boxShadow: 0, p: 2 }}>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
        </Card>
      </Grid>
    ));
  }

  if (productsListStatus === 'success') {
    BodyContent = productsList.map((item) => (
      <Grid item lg={3} xs={12} key={item.id}>
        <Card sx={{ boxShadow: 0, px: 2, py: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Stack display="flex" sx={{ flexWrap: 'nowrap' }}>
              <ProductName variant="subtitle2" fontSize={18} checked={item.checked}>
                {item.productName}
              </ProductName>
            </Stack>
            <Stack flexDirection="row" alignItems="center" gap={3}>
              <FormControl>
                <OutlinedInput
                  disabled={item.inputDisabled}
                  type="number"
                  sx={{ fontFamily: 'Poppins Regular', width: 65, height: 30 }}
                  id={`outlined-adornment-amount-${item.id}`}
                  value={item.inputValue || ''}
                  onChange={(event) => handleInputChange(item.id, event.target.value)}
                  inputProps={{ maxLength: 4 }}
                />
              </FormControl>
              <Checkbox size="large" checked={item.checked} onChange={() => handleCheckboxChange(item.id)} />
            </Stack>
          </Box>
        </Card>
      </Grid>
    ));
  }
  return (
    <Category1Root>
      <Grid container spacing={0.5} mb={17}>
        {BodyContent}
      </Grid>
    </Category1Root>
  );
}

// // Map Redux state to component props
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

// export default connect(mapStateToProps, mapDispatchToProps)(Category1);
