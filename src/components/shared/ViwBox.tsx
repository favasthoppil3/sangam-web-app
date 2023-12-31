import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export type PopupProps = {
  popup: boolean;
  handleClickClose: () => void;
  products: any;
  userName: string;
};

export default function ViewBox({ popup, handleClickClose, products, userName }: PopupProps) {
  return (
    <div>
      <Dialog fullScreen open={popup} onClose={handleClickClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {userName}
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClickClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            {/* <Button autoFocus color="inherit" onClick={handleClickClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          {products.map((item) => {
            return (
              <ListItem>
                <ListItemText primary={item.productName} secondary={item.inputValue} />
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </div>
  );
}
