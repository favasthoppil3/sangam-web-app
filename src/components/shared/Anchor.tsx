import { Link } from '@mui/material';
import { ComponentProps } from 'react';

export type AnchorProps = Omit<ComponentProps<typeof Link>, 'color' | 'variant'>;

function Anchor({ children, ...rest }: AnchorProps) {
  return (
    <Link variant="body2" color="primary" {...rest} sx={{ '&:hover': { color: 'primary.dark' } }}>
      {children}
    </Link>
  );
}

export default Anchor;
