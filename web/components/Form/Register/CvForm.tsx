import { Box, Typography, styled } from '@mui/material'
import { StandardRegisterProps } from './types'
import { FC } from 'react'
import FormFooter from '@/components/Form/FormFooter'
import { useForm } from 'react-hook-form'

const DragBox = styled(Box)`
  border: 4px dashed #1976d2;
  background-color: #efefef;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
`

const CvForm: FC<StandardRegisterProps<null>> = ({ onFormSubmit }) => {
  const { handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        If you don't have a CV available you can add one later by going to your Profile
      </Typography>
      <Typography gutterBottom>
        We'll use the information in your CV to suggest skills and opportunities that are
        more relevant to you
      </Typography>

      <DragBox>Drag your files here</DragBox>

      <FormFooter backUrl="/register/page8" />
    </form>
  )
}

export default CvForm
