import { TOP_BAR_HEIGHT, TOP_TAB_HEIGHT } from '@/config/Constants';
import {
  AppBar,
  Box,
  Card,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  getCategory2ProductsList,
  getProductsListStatus,
  setCategory2CheckedProducts,
  setCategory2InputValues,
  setInputValues,
  setSelectInputValues,
} from '@/store/Product/product.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { KG_OPTIONS } from '@/config/Selections';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';

const Category2Root = styled(Box)`
  margin-top: calc(${TOP_TAB_HEIGHT} + ${TOP_BAR_HEIGHT});
  .css-1h8xrka-MuiSvgIcon-root-MuiSelect-icon {
    top: 1.5px;
    right: 0px;
  }
  .css-9u5xgp-MuiSvgIcon-root-MuiSelect-icon {
    top: 1.5px;
    right: 0px;
  }
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

export default function Category2() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(getCategory2ProductsList);
  const [textFieldCount, setTextFieldCount] = useState<{ [key: number]: number }>({});
  const [deleteButtonVisible, setDeleteButtonVisible] = useState<{ [key: number]: boolean }>({});

  const handleNewRowAdd = (productId) => {
    if (!textFieldCount) {
      setTextFieldCount({ [productId]: 1 });
    } else {
      setTextFieldCount((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] ? prevCounts[productId] + 1 : 1,
      }));
    }
    setDeleteButtonVisible((prevVisibility) => ({
      ...prevVisibility,
      [productId]: true,
    }));
  };

  const handleDeleteRow = (productId) => {
    setTextFieldCount((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] - 1,
    }));
    if (textFieldCount[productId] === 1) {
      setDeleteButtonVisible((prevVisibility) => ({
        ...prevVisibility,
        [productId]: false,
      }));
    }
  };

  const handleCheckboxChange = (productId: number) => {
    dispatch(setCategory2CheckedProducts(productId));
  };

  const handleInputChange = (productId: number, productCount: string) => {
    if (/^\d{0,4}$/.test(productCount)) {
      dispatch(setCategory2InputValues({ productId, productCount }));
    }
    // updateProductInput(productId, productCount); // Dispatch the updateProductInput action
  };

  const handleSelectInputChange = (productId: number, productKg: string) => {
    dispatch(setSelectInputValues({ productId, productKg }));
  };
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
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Stack display="flex" sx={{ flexWrap: 'nowrap' }}>
              <ProductName variant="subtitle2" fontSize={18} checked={item.checked}>
                {item.productName}
              </ProductName>
            </Stack>

            <Box display="flex" gap={1} alignItems="center">
              <Box display="flex" flexDirection="column" gap={1}>
                {Array.from({ length: textFieldCount[item.id] || 1 }).map((_, index) => (
                  <Box display="flex" gap={1}>
                    <div>
                      <FormControl>
                        <Select
                          disabled={item.inputDisabled}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Poppins Regular',
                            width: 85,
                            height: 30,
                          }}
                          name=""
                          value={item.selectBox || ''}
                          onChange={(event) => handleSelectInputChange(item.id, event.target.value)}
                          //   error={touched.classStatus && !!errors.classStatus}
                        >
                          {KG_OPTIONS.map((opt) => (
                            <MenuItem key={opt.id} value={opt.name}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
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
                    </div>
                    {deleteButtonVisible[item.id] && (
                      <IconButton
                        aria-label="Delete Row"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteRow(item.id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
              <Stack flexDirection="row" justifyContent="end">
                <Checkbox size="large" checked={item.checked} onChange={() => handleCheckboxChange(item.id)} />
                <IconButton aria-label="Add Row" size="small" onClick={() => handleNewRowAdd(item.id)}>
                  <AddCircleOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </Box>
          <Box> </Box>
        </Card>
      </Grid>
    ));
  }
  return (
    <Category2Root>
      <Grid container spacing={0.5} mb={17}>
        {BodyContent}
      </Grid>
    </Category2Root>
  );
}
