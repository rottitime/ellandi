import Button from '@/components/UI/Button/Button'
import Modal from '@/components/UI/Modals/Modal/Modal'
import { FC } from 'react'
import { Props } from './types'

const WarningModal: FC<Props> = ({ children, onConfirm, confirmButton, ...props }) => (
  <Modal
    {...props}
    footer={
      <>
        <Button variant="outlined" onClick={(e) => props.onClose(e, 'escapeKeyDown')}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          {confirmButton}
        </Button>
      </>
    }
  >
    {children}
  </Modal>
)

export default WarningModal
