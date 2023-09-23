import CircleButton from '@/components/shared/CircleButton';
import { Badge } from '@mui/material';
import { ComponentProps } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import styled from 'styled-components';

const NotificationButtonRoot = styled(CircleButton)`
  .notification-badge {
    background-color: #732ebe;
    color: ${(props) => props.theme.palette.secondary.lighter};
    font-family: 'Poppins Regular';
    font-weight: 400;
    font-size: 0.65rem;
  }
`;

export type NotificationButtonProps = Omit<ComponentProps<typeof CircleButton>, 'size' | 'children'>;

function NotificationButton(props: NotificationButtonProps) {
  return (
    <NotificationButtonRoot size="small" {...props}>
      <Badge badgeContent={4} color="default" classes={{ badge: 'notification-badge' }}>
        <HiOutlineBell size="1.2rem" />
      </Badge>
    </NotificationButtonRoot>
  );
}

export default NotificationButton;
