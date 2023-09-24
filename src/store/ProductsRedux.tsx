// src/redux/productsReducer.js

// Initial state
const initialState = {
  products: [
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
  ],
  productListOpen: false,
};

// Reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? { ...product, checked: !product.checked, inputDisabled: !product.inputDisabled }
            : product
        ),
      };
    case 'UPDATE_PRODUCT_INPUT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId ? { ...product, inputValue: action.payload.productCount } : product
        ),
      };
    case 'TOGGLE_PRODUCT_LIST':
      return {
        ...state,
        productListOpen: !state.productListOpen,
      };
    default:
      return state;
  }
};

export default productsReducer;
