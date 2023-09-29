// import { Box, Stack, Typography, useTheme } from '@mui/material';
// import LoadingButton from '@mui/lab/LoadingButton';
// import React, { useEffect } from 'react';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import sangam_logo from '@/assets/sangam-logo.png';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// const StartingPageRoot = styled.div`
//   background-color: #fff;
//   .main_container {
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-evenly;
//     align-items: center;
//   }
//   .copyRight {
//     position: absolute;
//     top: 97%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     display: flex;
//     justify-content: center;
//     align-items: end;
//     color: #94a3b8;
//   }
// `;

// function StartingPage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [loading, setLoading] = React.useState(false);

//   useEffect(() => {
//     function handleClick() {
//       setLoading(true);
//       setTimeout(() => {
//         navigate('/home');
//       }, 2000);
//     }
//     handleClick();
//   }, []);

//   return (
//     <StartingPageRoot>
//       <Box className="main_container">
//         <Stack>
//           <img src={sangam_logo} width={150} alt="" />
//         </Stack>
//         {/* <Stack>
//           <LoadingButton
//             loading={loading}
//             className="button1"
//             variant="outlined"
//             sx={{
//               borderRadius: 50,
//               fontFamily: 'Poppins SemiBold',
//               fontSize: 15,
//             }}
//             size="medium"
//             endIcon={<ArrowForwardIcon />}
//           >
//             Get Start
//           </LoadingButton>
//         </Stack> */}
//       </Box>
//       <Stack direction="row" justifyContent="center" className="copyRight">
//         <Typography variant="subtitle2" fontSize={10} sx={{ fontFamily: 'Poppins SemiBold' }}>
//           Powered by Favas Thoppil
//         </Typography>
//       </Stack>
//     </StartingPageRoot>
//   );
// }

// export default StartingPage;
