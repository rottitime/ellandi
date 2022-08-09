import { FC } from 'react'
import { Props } from './types'

const ConditionalWrapper: FC<Props> = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children
}

export default ConditionalWrapper
