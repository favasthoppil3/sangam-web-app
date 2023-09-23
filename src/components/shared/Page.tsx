import { Helmet } from 'react-helmet-async';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

export type PageProps = {
  children: ReactNode;
  title: string;
  meta?: ReactNode;
  containerProps?: Omit<ComponentProps<typeof Box>, 'children'>;
};

const pageTransition: Variants = {
  initial: { opacity: 0, x: -200, y: 0 },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const PageContainer = motion(styled(Box)`
  background-color: ${(props) =>
    props.theme.themeMode === 'light' ? props.theme.palette.primary.lighter : props.theme.palette.grey[800]};
`);

const Page = forwardRef(({ children, title = '', meta, containerProps }: PageProps, ref: any) => (
  <>
    <Helmet>
      <>
        <title>{title !== '' ? `${title} - Sangam` : 'Sangam events'}</title>
        {meta}
      </>
    </Helmet>

    <PageContainer
      ref={ref}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      {...containerProps}
    >
      {children}
    </PageContainer>
  </>
));

export default Page;
