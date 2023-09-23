import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Theme } from '@mui/material';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'styled-components';

type ConfirmChoiceCallback = (choice: boolean) => void;

export type CustomDialogRenderParams = (renderparams: { resolve: ConfirmChoiceCallback; theme: Theme }) => ReactNode;

export type ConfirmDialogParameters = {
  message: string | ReactElement<any, string | JSXElementConstructor<any>>;
  title: string;
};

export type ConfirmationDialogOptions = {
  okLabel?: string;
  cancelLabel?: string;
  actionName?: string;
  renderDialogUI?: CustomDialogRenderParams;
  showOnlyOk?: boolean;
};

type ConfirmationDialogInternalState = ConfirmDialogParameters & {
  isOpen: boolean;
  options?: ConfirmationDialogOptions;
};

export type ConfirmAPI = {
  confirm: (
    message: string | ReactElement<any, string | JSXElementConstructor<any>>,
    title: string,
    options?: ConfirmationDialogOptions
  ) => Promise<boolean>;
  isAsking: boolean;
  actionName?: string;
};

export type ConfirmationDialogProviderProps = {
  children: ReactNode;
};

const ConfirmationDialogContext = createContext<ConfirmAPI>({
  confirm: () => {},
  isOpen: false,
} as unknown as ConfirmAPI);

function ConfirmationDialogProider({ children }: ConfirmationDialogProviderProps) {
  const theme = useTheme();
  const [state, setState] = useState<ConfirmationDialogInternalState>({
    isOpen: false,
    title: 'Confirm',
    message: 'Are you sure?',
    options: {
      okLabel: 'Ok',
      cancelLabel: 'Cancel',
    },
  });
  const fn = useRef<ConfirmChoiceCallback>();
  const confirm = useCallback(
    (
      message: string | ReactElement<any, string | JSXElementConstructor<any>>,
      title: string,
      options?: ConfirmationDialogOptions
    ) =>
      new Promise<boolean>((resolve) => {
        fn.current = (choice: boolean) => {
          resolve(choice);
          setState((prevState) => ({ ...prevState, isOpen: false }));
        };
        setState({ message, title, options, isOpen: true });
      }),
    []
  );

  const { title, message } = state;

  const handleOKClick = () => {
    fn?.current?.(true);
  };

  const handleCancelClick = () => {
    fn?.current?.(false);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const confirmAPIValue = useMemo<ConfirmAPI>(
    () => ({
      confirm,
      isAsking: state.isOpen,
      actionName: state.options?.actionName,
    }),
    [confirm, state.isOpen, state.options?.actionName]
  );

  return (
    <ConfirmationDialogContext.Provider value={confirmAPIValue}>
      {children}

      <Dialog open={state.isOpen} BackdropProps={{ onClick: handleBackdropClick }}>
        <DialogTitle fontSize={16}>{title}</DialogTitle>
        {!!state.options?.renderDialogUI && !!fn.current ? (
          state.options.renderDialogUI({ resolve: fn.current, theme })
        ) : (
          <DialogContent sx={{ padding: 0, px: 5, fontSize: 14 }} dividers>
            {message}
          </DialogContent>
        )}
        <Box sx={{ padding: '15px' }}>
          <Stack spacing={1} direction="row">
            {!state.options?.showOnlyOk && (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ color: '#fff' }}
                onClick={handleCancelClick}
                fullWidth
              >
                {state.options?.cancelLabel || 'Cancel'}
              </Button>
            )}
            <Button fullWidth variant="contained" color="primary" size="small" onClick={handleOKClick}>
              {state.options?.okLabel || 'Ok'}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </ConfirmationDialogContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmationDialogContext);
}

export default ConfirmationDialogProider;
