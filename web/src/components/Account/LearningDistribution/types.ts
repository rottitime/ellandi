import { ReportDistributionData } from '@/service/types'
import { AllColors } from '@/style/types'

type Data = ReportDistributionData & { color?: AllColors }

export type Props = {
  barData: Data[]
  description?: string
  titleTip?: string
  days?: number
  percentage?: number
}
