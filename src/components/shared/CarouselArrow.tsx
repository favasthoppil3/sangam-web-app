import { IconButton, useTheme } from '@mui/material';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useSettings from '@/hooks/useSettings';

export type CarouselArrowProps = {
  direction: 'previous' | 'next';
  onClick?: any;
  className?: string;
  style?: any;
};

const CarouselArrowRoot = styled(IconButton)`
  width: 48px;
  height: 48px;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.secondary.lighter : props.theme.palette.grey['800']};
  z-index: 99;
`;

function CarouselArrow({ direction, onClick = () => {}, className = '', style = {} }: CarouselArrowProps) {
  const { themeMode } = useSettings();
  const theme = useTheme();
  return (
    <CarouselArrowRoot onClick={onClick} className={className} sx={{ ...style }}>
      {direction === 'next' ? (
        <FiChevronRight color={themeMode === 'light' ? theme.palette.secondary.darker : theme.palette.common.white} />
      ) : (
        <FiChevronLeft color={themeMode === 'light' ? theme.palette.secondary.darker : theme.palette.common.white} />
      )}
    </CarouselArrowRoot>
  );
}

export default CarouselArrow;
