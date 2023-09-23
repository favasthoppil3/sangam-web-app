import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Category1 from '@/features/Category1/Category1';
import { AppBar } from '@mui/material';
import { TOP_BAR_HEIGHT, TOP_TAB_HEIGHT } from '@/config/Constants';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  React.useEffect(() => {
    const tabPanelElement = document.getElementById(`tabpanel-${value}`);
    if (tabPanelElement) {
      tabPanelElement.scrollTo(0, 0);
    }
  }, [value]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const handleTabPanelRef = (ref, index) => {
    tabPanelRefs.current[index] = ref;
  };
  return (
    <CategoryRoot>
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
    </CategoryRoot>
  );
}
