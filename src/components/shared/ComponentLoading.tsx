import styled from 'styled-components';
import { Theme, useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

const ComponentLoadingRoot = styled.div<{ $theme: Theme; $fullheight?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(props) => (props.$fullheight ? '100vh' : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$theme.palette.background.default};
`;

function ComponentLoading() {
  const theme = useTheme();
  return (
    <ComponentLoadingRoot $theme={theme}>
      <CircularProgress />
    </ComponentLoadingRoot>
  );
}

export default ComponentLoading;
