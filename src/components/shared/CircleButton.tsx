import { getBgColor } from '@/utils/Colors';
import { Fab } from '@mui/material';
import { ComponentProps } from 'react';
import styled from 'styled-components';

export type CircleButtonProps = Omit<ComponentProps<typeof Fab>, 'color' | 'variant'>;

const FabRoot = styled(Fab)`
  box-shadow: ${(props) =>
    props.theme.themeMode === 'light'
      ? '0px 0px 15px 0px rgb(113 113 113 / 37%)'
      : '0px 0px 15px 0px rgb(0 0 0 / 37%)'};
  background-color: ${(props) => getBgColor(props.theme)};
  color: ${(props) => props.theme.palette.secondary.main};

  &:hover {
    box-shadow: ${(props) =>
      props.theme.themeMode === 'light'
        ? '0px 0px 15px 0px rgb(113 113 113 / 37%)'
        : '0px 0px 15px 0px rgb(0 0 0 / 37%)'};
    color: ${(props) =>
      props.theme.themeMode === 'light' ? props.theme.palette.secondary.darker : props.theme.palette.secondary.lighter};
    background-color: ${(props) => getBgColor(props.theme)};
  }
`;

function CircleButton({ children, ...rest }: CircleButtonProps) {
  return (
    <FabRoot color="default" variant="circular" {...rest}>
      {children}
    </FabRoot>
  );
}

export default CircleButton;
