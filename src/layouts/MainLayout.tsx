import SideBar from '@/features/mainlayout/SideBar/SideBar';
import TopBar from '@/features/mainlayout/TopBar';
import { SIDE_BAR_WIDTH, TOP_BAR_HEIGHT } from '@/config/constants';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { breakPoints } from '@/config/breakpoints';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleSidebar } from '@/store/drawer.slice';
import TreeMenu from '@/features/mainlayout/SideBar/TreeMenu';
import { useCallback } from 'react';
import { TreeMenuItem } from '@/types/Layout';
import { AnimatePresence } from 'framer-motion';

const Content = styled.section`
  padding-top: ${TOP_BAR_HEIGHT};
  @media ${breakPoints.md} {
    padding-left: ${SIDE_BAR_WIDTH};
  }
  overflow-x: hidden;
`;

function MainLayout() {
  const dispatch = useAppDispatch();

  const handleMenuItemClick = useCallback(
    (node: TreeMenuItem) => {
      console.log(node);
      if (node && node.link && !window.matchMedia(breakPoints.md).matches) {
        dispatch(toggleSidebar());
      }
    },
    [dispatch]
  );

  return (
    <main className="sangam-mainLayout-root">
      <TopBar />
      <SideBar>
        {/* <List sx={{ paddingTop: '8px', paddingBottom: 0 }}>
          <ListItem disablePadding component={Link} to="/" onClick={handleMenuItemClick}>
            <ListItemButton>
              <ListItemIcon>
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header1">
            <Typography>
              <HowToRegIcon sx={{ mr: 1 }} /> Attendance Marking
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItem disablePadding component={Link} to="/classmarking" onClick={handleMenuItemClick}>
                <ListItemButton>
                  <ListItemText primary="Class Marking" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding component={Link} to="/classmarking-detail" onClick={handleMenuItemClick}>
                <ListItemButton>
                  <ListItemText primary="Detail Class Marking" />
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion> */}
        <TreeMenu onNodeClick={handleMenuItemClick} />
      </SideBar>
      <Content>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Content>
    </main>
  );
}

export default MainLayout;
