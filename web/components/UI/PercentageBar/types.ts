import { ColorBrands, Colors } from '@/style/types'

export type Props = {
  brandColor?: keyof ColorBrands
  marks?: MarkType[]
  data: DataType[]
}

type MarkType = {
  value: number
  label: string
}

type DataType = {
  percentage: number
  label: string
  color: keyof Colors | keyof ColorBrands
}
