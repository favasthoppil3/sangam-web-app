import { SIDE_BAR_WIDTH, TOP_BAR_HEIGHT } from '@/config/constants';
import useAuth from '@/hooks/useAuth';
import { getTextColor } from '@/utils/Colors';
import styled from 'styled-components';
import NotificationButton from '@/features/mainlayout/NotificationButton';
import SettingsButton from '@/features/mainlayout/DarkMode';
import { Button, IconButton } from '@mui/material';
import { breakPoints } from '@/config/breakpoints';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleSidebar } from '@/store/drawer.slice';
import { AiOutlineMenu } from 'react-icons/ai';

const TopBarRoot = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: ${TOP_BAR_HEIGHT};
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[900]};
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: ${(props) =>
    props.theme.themeMode === 'light' ? '0 2px 7px -1px rgb(0 0 0 / 9%)' : '0 2px 2px 1px rgb(14 14 14 / 61%)'};
  z-index: ${(props) => props.theme.zIndex.appBar};

  .lhs {
    flex-shrink: 0;
    width: calc(${SIDE_BAR_WIDTH} - 15px);
    display: flex;
    align-items: center;
    .brand-wrap {
      width: 100%;
      display: flex;
      align-items: center;
      .brand-icon {
        flex-shrink: 0;
        width: 45px;
        height: 45px;
        background-color: ${(props) =>
          props.theme.themeMode === 'light' ? props.theme.palette.common.white : props.theme.palette.grey[800]};
        border-radius: 50%;
        box-shadow: ${(props) =>
          props.theme.themeMode === 'light'
            ? '0px 0px 15px 0px rgb(113 113 113 / 37%)'
            : '0px 0px 15px 0px rgb(0 0 0 / 60%)'};
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 28px;
          height: 36px;
        }
      }

      span {
        display: block;
        width: 100%;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }

  .middle {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
  }

  .rhs {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;

    .rhsl {
      width: 100%;
      flex-grow: 1;
      display: flex;
      justify-content: space-between;

      @media ${breakPoints.lg} {
        padding-right: 30px;
      }

      .greet-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .greet-msg {
          font-family: 'Poppins Medium';
          font-size: 1.6rem;
          color: ${(props) => getTextColor(props.theme)};

          .orange {
            font-family: 'Poppins Semibold';
            font-size: 1.6rem;
            color: ${(props) => props.theme.palette.primary.main};
          }
        }

        .wish {
          font-family: 'Poppins Regular';
          font-size: 1.1rem;
          color: ${(props) => props.theme.palette.grey[600]};
        }
      }

      .reg-button-wrap {
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }
    }

    .circle-button-wrap {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 8px;

      .login-user-root {
        margin-right: 15px;
      }
    }
  }
`;

function TopBar() {
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const handleHamburgerClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <TopBarRoot>
      <section className="lhs">
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          edge="start"
          onClick={handleHamburgerClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <AiOutlineMenu />
        </IconButton>
        <div className="brand-wrap">
          <div className="brand-icon me-2">
            <img src="/logo-small.png" alt="Logo" />
          </div>
          <span>Sangam</span>
        </div>
      </section>

      <section className="rhs">
        <div className="circle-button-wrap">
          <NotificationButton />
          <SettingsButton />
        </div>
      </section>
    </TopBarRoot>
  );
}

export default TopBar;
