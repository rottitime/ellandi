import Button from '@/components/UI/Button/Button'
import Dialog from '@/components/UI/Dialogs/Dialog/Dialog'
import { FC } from 'react'
import { Props } from './types'

const WarningDialog: FC<Props> = ({
  children,
  onConfirm,
  confirmButton,
  buttonLoading,
  ...props
}) => (
  <Dialog
    {...props}
    actions={
      <>
        <Button color="secondary" onClick={(e) => props.onClose(e, 'escapeKeyDown')}>
          Cancel
        </Button>
        <Button color="error" onClick={onConfirm} loading={buttonLoading}>
          {confirmButton}
        </Button>
      </>
    }
  >
    {children}
  </Dialog>
)

export default WarningDialog
