import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { DeleteMessage } from './DeleteMessage';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export type PopupProps = {
  popup: boolean;
  handleClickClose: () => void;
};

export default function DeleteBox({ popup, handleClickClose }: PopupProps) {
  const theme = useTheme();
  return (
    <div>
      <BootstrapDialog onClose={handleClickClose} aria-labelledby="customized-dialog-title" open={popup}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          {' '}
        </BootstrapDialogTitle>
        <DialogContent className="px-5" dividers>
          <DeleteMessage message="Are you sure want to Delete?" />
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={handleClickClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button fullWidth variant="contained" color="error" onClick={() => {}}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
