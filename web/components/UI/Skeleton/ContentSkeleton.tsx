import React, { FC } from 'react'
import Skeleton from '@/components/UI/Skeleton/Skeleton'

type Props = {
  lines?: number
}

const min = 40
const max = 70

const ContentSkeleton: FC<Props> = ({ lines = 3 }) => (
  <div>
    <Skeleton
      sx={{ height: 40, maxWidth: `${Math.floor(Math.random() * (max - min) + min)}%` }}
    />
    {[...Array(lines).keys()].map((i) => (
      <Skeleton
        key={i}
        sx={{ maxWidth: `${Math.floor(Math.random() * (max - min) + min)}%` }}
      />
    ))}
  </div>
)

export default ContentSkeleton
