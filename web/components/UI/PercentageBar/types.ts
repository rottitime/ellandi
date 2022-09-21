import { ColorBrands } from '@/style/types'

export type Props = {
  brandColor?: keyof ColorBrands
  marks?: MarkType[]
}

export type MarkType = {
  value: number
  label: string
}
