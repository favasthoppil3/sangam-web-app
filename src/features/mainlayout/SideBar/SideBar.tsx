import { breakPoints } from '@/config/breakpoints';
import { SIDE_BAR_WIDTH, TOP_BAR_HEIGHT } from '@/config/constants';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getSideBarState, toggleSidebar } from '@/store/drawer.slice';
import { Drawer } from '@mui/material';
import { ReactNode } from 'react';
import styled from 'styled-components';

const SideBarRoot = styled.aside`
  position: fixed;
  top: ${TOP_BAR_HEIGHT};
  left: 0;
  width: 0;
  height: calc(100vh - ${TOP_BAR_HEIGHT});
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[900]};
  box-shadow: ${(props) =>
    props.theme.themeMode === 'light' ? '0 1px 2px 0 rgb(0 0 0 / 5%)' : '0px 3px 9px #00000066'};
  border-right: ${(props) =>
    props.theme.themeMode === 'light' ? '1px solid rgb(185 182 182 / 18%)' : '1px solid rgb(0 0 0 / 18%)'};

  z-index: ${(props) => props.theme.zIndex.appBar - 10};

  @media ${breakPoints.md} {
    width: ${SIDE_BAR_WIDTH};
  }
`;

export type SideBarProps = {
  window?: () => Window;
  children: ReactNode;
};

function SideBar(props: SideBarProps) {
  const { window, children } = props;

  const sideBarOpen = useAppSelector(getSideBarState);
  const dispatch = useAppDispatch();

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <SideBarRoot>
      <Drawer
        container={container}
        variant="temporary"
        open={sideBarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDE_BAR_WIDTH, paddingTop: '15px' },
        }}
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDE_BAR_WIDTH,
            marginTop: TOP_BAR_HEIGHT,
            height: `calc(100% - ${TOP_BAR_HEIGHT})`,

            paddingTop: '15px',
          },
        }}
        open
      >
        {children}
      </Drawer>
    </SideBarRoot>
  );
}

export default SideBar;
