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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ProductList from '@/components/shared/Drawer';
import { ProductsTypes } from '@/types/ProductCategory';
import { connect } from 'react-redux'; // Import connect from react-redux

const Category1Root = styled(Box)`
  margin-top: calc(${TOP_TAB_HEIGHT} + ${TOP_BAR_HEIGHT});
  /* height: calc(100vh - (${TOP_BAR_HEIGHT} + ${TOP_TAB_HEIGHT} + 6.25rem)); */
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
  text-decoration: line-through;
  text-decoration-color: ${(props) => props.theme.palette.primary.main};
  ${({ checked }) =>
    checked &&
    css`
      text-decoration: none;
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

function Category1({
  products,
  toggleProduct, // Action to toggle a product
  updateProductInput, // Action to update product input
  toggleProductList,
}: any) {
  const handleCheckboxChange = (productId: number) => {
    toggleProduct(productId); // Dispatch the toggleProduct action
  };

  const handleInputChange = (productId: number, productCount: string) => {
    if (/^\d{0,4}$/.test(productCount)) {
      updateProductInput(productId, productCount); // Dispatch the updateProductInput action
    }
  };
  // const handleCheckboxChange = (productId: number) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === productId
  //         ? { ...product, checked: !product.checked, inputDisabled: !product.inputDisabled }
  //         : product
  //     )
  //   );
  // };
  // const handleInputChange = (productId: number, productCount: string) => {
  //   if (/^\d{0,4}$/.test(productCount)) {
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) => (product.id === productId ? { ...product, inputValue: productCount } : product))
  //     );
  //   }
  // };

  return (
    <Category1Root>
      <Grid container spacing={1} mb={8}>
        {products.map((item) => (
          <Grid item lg={3} xs={12} key={item.id}>
            <Card sx={{ boxShadow: 0, p: 2 }}>
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
                      sx={{ fontFamily: 'Poppins Regular', maxWidth: 65, height: 30 }}
                      id={`outlined-adornment-amount-${item.id}`}
                      value={item.inputValue || ''}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      inputProps={{ maxLength: 4 }}
                    />
                  </FormControl>
                  <Checkbox size="medium" checked={item.checked} onChange={() => handleCheckboxChange(item.id)} />
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Category1Root>
  );
}

// Map Redux state to component props
const mapStateToProps = (state) => ({
  products: state.products,
  productListOpen: state.productListOpen,
});

// Define Redux actions
const mapDispatchToProps = (dispatch) => ({
  toggleProduct: (productId) => {
    dispatch({ type: 'TOGGLE_PRODUCT', payload: { productId } });
  },
  updateProductInput: (productId, productCount) => {
    dispatch({ type: 'UPDATE_PRODUCT_INPUT', payload: { productId, productCount } });
  },
  toggleProductList: (open) => {
    dispatch({ type: 'TOGGLE_PRODUCT_LIST', payload: { open } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Category1);
