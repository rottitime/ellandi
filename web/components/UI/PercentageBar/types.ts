import { ColorBrands, Colors } from '@/style/types'

export type Props = {
  marks?: MarkType[]
  data: BarDataType[]
}

type MarkType = {
  value: number
  label: string
}

export type BarDataType = {
  percentage: number
  label: string
  color: keyof Colors | keyof ColorBrands
}
