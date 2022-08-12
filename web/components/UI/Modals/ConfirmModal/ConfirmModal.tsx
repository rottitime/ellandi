import { Box, Modal, Typography, styled } from '@mui/material'
import Button from '@/components/UI/Button/Button'
import { FC } from 'react'
import { Props } from './types'

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  border: none;
  padding: ${(p) => p.theme.spacing(3)};
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background-color: ${(p) => p.theme.colors.white};

  header {
    margin-bottom: ${(p) => p.theme.spacing(4)};
  }
  footer {
    display: flex;
    justify-content: flex-end;
    gap: ${(p) => p.theme.spacing(2)};
    margin-top: ${(p) => p.theme.spacing(4)};
  }
`

const ConfirmModal: FC<Props> = ({
  children,
  title,
  onConfirm,
  confirmButton,
  ...props
}) => {
  return (
    <Modal {...props} aria-labelledby={title}>
      <ModalContent>
        <header>
          <Typography variant="h1" component="h3">
            {title}
          </Typography>
        </header>
        {children}
        <footer>
          <Button variant="outlined" onClick={(e) => props.onClose(e, 'escapeKeyDown')}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {confirmButton}
          </Button>
        </footer>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
