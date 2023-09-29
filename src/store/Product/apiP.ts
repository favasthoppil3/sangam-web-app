import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Unknown error in fetching Products List';
  }
};

export const updateProduct = async (productId: number, checked: boolean) => {
  try {
    const response = await axios.put(`/api/products/${productId}`, { checked });
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Unknown error in updating the product';
  }
};
