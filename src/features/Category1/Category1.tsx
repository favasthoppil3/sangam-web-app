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
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import styled, { css } from 'styled-components';
import ProductList from '@/components/shared/Drawer';
import { ProductsTypes } from '@/types/ProductCategory';

const Category1Root = styled(Box)`
  margin-top: calc(${TOP_TAB_HEIGHT} + ${TOP_BAR_HEIGHT} - 20px);
  /* height: calc(100vh - (${TOP_BAR_HEIGHT} + ${TOP_TAB_HEIGHT} + 100px)); */
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
//   /* border: 1px solid ${(props) => props.theme.palette.primary.main}; */
//   ${({ inputDisabled }) =>
//     inputDisabled &&
//     css`
//       /* border: 1px solid ${(props) => props.theme.palette.primary.main}; */
//     `}
// `;

function Category1() {
  const [products, setProducts] = useState<ProductsTypes[]>([
    { id: 1, productName: 'Apple', checked: false, inputDisabled: true, inputValue: '' },
    { id: 2, productName: 'Banana', checked: false, inputDisabled: true, inputValue: '' },
    { id: 3, productName: 'Orange', checked: false, inputDisabled: true, inputValue: '' },
    { id: 4, productName: 'Mango', checked: false, inputDisabled: true, inputValue: '' },
    { id: 5, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
    { id: 6, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
    { id: 7, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
    { id: 8, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
    { id: 9, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
    { id: 10, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
  ]);

  const [productListOpen, setProductListOpen] = useState(false);
  const checkedProducts = products.filter((product) => product.checked);

  const handleCheckboxChange = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, checked: !product.checked, inputDisabled: !product.inputDisabled }
          : product
      )
    );
  };
  const handleInputChange = (productId: number, productCount: string) => {
    if (/^\d{0,4}$/.test(productCount)) {
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === productId ? { ...product, inputValue: productCount } : product))
      );
    }
  };

  return (
    <Category1Root>
      <Stack flexDirection="row" justifyContent="end">
        <IconButton color="primary" onClick={() => setProductListOpen(true)}>
          <BallotRoundedIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
      <ProductList open={productListOpen} checkedProducts={checkedProducts} onClose={() => setProductListOpen(false)} />
      <Grid container spacing={1} mb={8}>
        {products.map((item) => (
          <Grid item lg={3} xs={12} key={item.id}>
            <Card sx={{ boxShadow: 0, p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack display="flex" sx={{ flexWrap: 'nowrap' }}>
                  <ProductName variant="subtitle2" checked={item.checked}>
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

export default Category1;
