import Button from '@/components/UI/Button/Button'
import Modal from '@/components/UI/Modals/Modal/Modal'
import { FC } from 'react'
import { Props } from './types'

const WarningModal: FC<Props> = ({
  children,
  onConfirm,
  confirmButton,
  buttonLoading,
  ...props
}) => (
  <Modal
    {...props}
    footer={
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
  </Modal>
)

export default WarningModal
