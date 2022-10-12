import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'
import LearningAddFormalForm from '@/components/Form/LearningAddFormalForm/LearningAddFormalForm'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { SkeletonRadio } from '@/components/UI/Skeleton/RadioSkeleton.stories'
import { fetchLearningTypes, GenericDataList, Query } from '@/service/api'
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography
} from '@mui/material'
import { FC, useId, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { ModalProps } from './types'

const Modal = styled(Box)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 600px;
  }
`

const LearningEditModal: FC<ModalProps> = ({ data }) => {
  const id = useId()
  const labelId = `label-learning_type-${id}`
  const [type, setType] = useState<string>(data?.learning_type)
  const { data: types, isLoading: isLoadingTypes } = useQuery<GenericDataList[], Error>(
    Query.LearningTypes,
    fetchLearningTypes,
    { staleTime: Infinity }
  )

  const formRef = useRef(null)

  const formProps = {
    loading: false,
    defaultValues: data,
    compact: true,
    onFormSubmit: (data) => {
      console.log({ data, learning_type: type })
    }
  }

  console.log({ data })

  return (
    <Modal>
      <Typography component="label" id={labelId} gutterBottom>
        <BadgeNumber label="1" /> Edit type of learning
      </Typography>
      {isLoadingTypes ? (
        [...Array(3).keys()].map((i) => <SkeletonRadio key={i} />)
      ) : (
        <RadioGroup
          aria-labelledby={labelId}
          defaultValue={data?.learning_type}
          name="learning_type"
          onChange={(e) => setType(e.currentTarget.value)}
          sx={{ mb: 4 }}
        >
          {types.map(({ name }) => (
            <FormControlLabel value={name} control={<Radio />} label={name} key={name} />
          ))}
        </RadioGroup>
      )}

      {type.toLowerCase() === 'formal' ? (
        <LearningAddFormalForm {...formProps} />
      ) : (
        <LearningAddForm {...formProps} ref={formRef} />
      )}
    </Modal>
  )
}

export default LearningEditModal
