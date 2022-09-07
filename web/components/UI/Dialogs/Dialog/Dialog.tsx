import {
  Dialog as MuiDialog,
  styled,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide
} from '@mui/material'
import React, { FC, forwardRef, useId } from 'react'
import { Props, TransitionProps } from './types'

const StyledDialog = styled(MuiDialog)`
  .MuiDialog-paper {
    border: none;
    padding: ${(p) => p.theme.spacing(3)};
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    background-color: ${(p) => p.theme.colors.white};
  }

  .MuiDialogTitle-root + .MuiDialogContent-root {
    padding-top: ${(p) => p.theme.spacing(3)};
  }
`

const Dialog: FC<Props> = ({ children, title, maxWidth = 'md', actions, ...props }) => {
  const id = useId()
  const idTitle = `${id}-title`
  const idDescription = `${id}-description`

  return (
    <StyledDialog
      {...props}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      aria-labelledby={idTitle}
      aria-describedby={idDescription}
    >
      <DialogTitle id={idTitle}>{title}</DialogTitle>
      <DialogContent id={idDescription}>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </StyledDialog>
  )
}

export default Dialog
export { DialogContentText } from '@mui/material'

const Transition = forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})
