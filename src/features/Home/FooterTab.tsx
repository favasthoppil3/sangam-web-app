import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import ListCategories from '@/features/Home/ListCategories';
import CategoryTabs from '@/pages/CategoryPage';
import styled from 'styled-components';
import { TOP_BAR_HEIGHT } from '@/config/Constants';

const FooterTabRoot = styled(Box)`
  .Footer_tab {
    background-color: ${(props) =>
      props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[800]};
  }
  .tab-panel {
    /* margin-top: ${TOP_BAR_HEIGHT}; */
  }
`;
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tab-panel "
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
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
    <FooterTabRoot>
      <Box>
        <TabPanel ref={(ref) => handleTabPanelRef(ref, 0)} value={value} index={0} dir={theme.direction}>
          <ListCategories />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CategoryTabs />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {' '}
        </TabPanel>
      </Box>
      <AppBar>
        <Tabs
          className="Footer_tab"
          sx={{
            position: 'fixed ',
            bottom: 0,
            width: '100%',
            boxShadow: 10,
          }}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<HomeRoundedIcon />} {...a11yProps(0)} />
          <Tab icon={<FactCheckRoundedIcon />} {...a11yProps(1)} />
          <Tab icon={<PersonPinIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </FooterTabRoot>
  );
}
