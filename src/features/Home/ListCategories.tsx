import React, { useCallback, useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
  IconButton,
  Button,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import styled from 'styled-components';
import DeleteBox from '@/components/shared/DeleteBox';
import { TOP_BAR_HEIGHT } from '@/config/Constants';
import ViewBox from '@/components/shared/ViwBox';
import emptyBox from '@/assets/empty-box.png';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// Styled component for the root div
const ListCategoriesRoot = styled.div`
  padding: 20px;
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[900]};
  min-height: 100vh;
  padding-top: calc(${TOP_BAR_HEIGHT} + 20px);
`;

function ListCategories() {
  const theme = useTheme();
  const [deletePopup, setDeletePopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Open the delete popup
  const handleDeletePopupOpen = useCallback(() => {
    setDeletePopup(true);
  }, []);

  // Close the delete popup
  const handleDeletePopupClose = useCallback(() => {
    setDeletePopup(false);
  }, []);

  // Handle change in the search input
  const handleChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Handle the delete action
  const handleDelete = useCallback(
    (id) => {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      localStorage.setItem('myArray', JSON.stringify(updatedData));
      setDeletePopup(false);
    },
    [data]
  );

  // Fetch data from local storage on component mount
  useEffect(() => {
    const existingArray = JSON.parse(localStorage.getItem('myArray')) || [];
    setData(existingArray);
  }, []);

  // Filter search results based on search term
  useEffect(() => {
    const results = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [data, searchTerm]);

  return (
    <ListCategoriesRoot>
      <FormControl fullWidth sx={{ mb: 2.5 }}>
        <OutlinedInput
          value={searchTerm}
          onChange={handleChange}
          sx={{ fontFamily: 'Poppins Regular' }}
          id="outlined-adornment-amount"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      {searchResults.length === 0 ? (
        <Box
          width="100%"
          sx={{ height: 'calc(100vh - 250px)' }}
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
      ) : (
        <Grid container spacing={2} mb={8}>
          {searchResults.map((item) => (
            <Grid key={item.id} item lg={3} xs={12}>
              <Card
                sx={{
                  boxShadow: 0,
                  p: 2,
                }}
              >
                <Box>
                  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" sx={{ color: theme.palette.grey[600] }} gap={1}>
                      <TodayOutlinedIcon />
                      <Typography variant="subtitle2" fontSize={16}>
                        {item.currentDate}
                      </Typography>
                    </Stack>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteOutlineRoundedIcon sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" alignItems="center" sx={{ color: theme.palette.grey[600] }} gap={1}>
                    <PlaceOutlinedIcon />
                    <Typography variant="subtitle2" fontSize={16}>
                      {item.place}
                    </Typography>
                  </Stack>
                  <Stack mt={3} ml={1}>
                    <Typography variant="h6">{item.name}</Typography>
                  </Stack>
                  <Box display="flex" justifyContent="center" my={1}>
                    <Button onClick={() => setViewPopup(true)} variant="contained" sx={{ px: 5 }}>
                      View
                    </Button>
                  </Box>
                </Box>
              </Card>
              <DeleteBox
                onDelete={() => handleDelete(item.id)}
                popup={deletePopup}
                handleClickClose={handleDeletePopupClose}
              />
              <ViewBox
                products={item.products}
                userName={item.name}
                popup={viewPopup}
                handleClickClose={() => setViewPopup(false)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </ListCategoriesRoot>
  );
}

export default ListCategories;
