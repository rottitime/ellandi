import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'
import LearningAddFormalForm from '@/components/Form/LearningAddFormalForm/LearningAddFormalForm'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { SkeletonRadio } from '@/components/UI/Skeleton/RadioSkeleton.stories'
import { fetchLearningTypes, GenericDataList, Query } from '@/service/api'
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FC, useId, useState } from 'react'
import { useQuery } from 'react-query'
import { ModalProps } from './types'

const LearningEditModal: FC<ModalProps> = ({ data }) => {
  const id = useId()
  const [type, setType] = useState<string>(data?.learning_type)
  const { data: types, isLoading: isLoadingTypes } = useQuery<GenericDataList[], Error>(
    Query.LearningTypes,
    fetchLearningTypes,
    { staleTime: Infinity }
  )

  const labelId = `label-learning_type-${id}`
  const formProps = {
    loading: false,
    defaultValues: data,
    onFormSubmit: (data) => {
      console.log({ data })
    }
  }

  return (
    <>
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
        >
          {types.map(({ name }) => (
            <FormControlLabel value={name} control={<Radio />} label={name} key={name} />
          ))}
        </RadioGroup>
      )}

      {type.toLowerCase() === 'formal' ? (
        <LearningAddFormalForm {...formProps} />
      ) : (
        <LearningAddForm {...formProps} />
      )}
    </>
  )
}

export default LearningEditModal
