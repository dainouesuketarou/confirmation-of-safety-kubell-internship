import type { BaseSyntheticEvent, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { IconButton } from '../IconButton';

import { Overlay, Dialog } from './style';

interface Props {
  children?: ReactNode;
}

const stopPropagation = (event: BaseSyntheticEvent) => event.stopPropagation();

export function useDialog() {
  const [state, setState] = useState(false);

  const openDialog = useCallback(() => setState(true), []);
  const closeDialog = useCallback(() => setState(false), []);

  const MemoizedDialog = useCallback(
    function DialogLayout({ children }: Props) {
      return (
        <Overlay
          style={{ display: state ? 'flex' : 'none' }}
          onClick={closeDialog}
        >
          <Dialog style={{width: '70%', height: '70%'}} onClick={stopPropagation}>
            <IconButton
              buttonType="danger"
              icon="circle-cross"
              onClick={closeDialog}
            />
            {children}
          </Dialog>
        </Overlay>
      );
    },
    [closeDialog, state],
  );

  return [MemoizedDialog, openDialog, closeDialog] as const;
}
