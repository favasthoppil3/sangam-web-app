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
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import styled from 'styled-components';
import { DeleteMessage } from '@/components/shared/DeleteMessage';
import DeleteBox from '@/components/shared/DeleteBox';
import ViewBox from '@/components/shared/ViwBox';
import { TOP_BAR_HEIGHT } from '@/config/Constants';

const ListPeople = [
  'Siri',
  'Alexa',
  'Apple',
  'Orenga',
  'Siri',
  'Alexa',
  'Apple',
  'Orenga',
  'Siri',
  'Alexa',
  'Apple',
  'Orenga',
];

const ListCategoriesRoot = styled.div`
  padding: 20px;
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.grey[200] : props.theme.palette.grey[900]};
  min-height: 100vh;
  margin-top: ${TOP_BAR_HEIGHT};
`;
function ListCategories() {
  const theme = useTheme();
  const [deletePopup, setDeletePopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const handleDeletePopupOpen = () => {
    setDeletePopup(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopup(false);
  };

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = ListPeople.filter((people) => people.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm]);

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
      <Grid container spacing={2} mb={8}>
        {searchResults.map((people) => {
          return (
            <Grid item lg={3} xs={12}>
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
                      <Typography variant="subtitle2">12.02.2023&nbsp;-&nbsp;Friday</Typography>
                    </Stack>
                    <IconButton onClick={handleDeletePopupOpen}>
                      <DeleteOutlineRoundedIcon sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" alignItems="center" sx={{ color: theme.palette.grey[600] }} gap={1}>
                    <PlaceOutlinedIcon />
                    <Typography variant="subtitle2">Thenkara</Typography>
                  </Stack>
                  <Stack mt={3} ml={1}>
                    <Typography variant="h6">{people}</Typography>
                  </Stack>
                  <Box display="flex" justifyContent="center" my={1}>
                    <Button onClick={() => setViewPopup(true)} variant="contained" sx={{ px: 5 }}>
                      View
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <DeleteBox popup={deletePopup} handleClickClose={handleDeletePopupClose} />
      <ViewBox popup={viewPopup} handleClickClose={() => setViewPopup(false)} />
    </ListCategoriesRoot>
  );
}

export default ListCategories;
