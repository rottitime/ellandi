import PercentageBar from '@/components/UI/PercentageBar/PercentageBar'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import Typography from '@/components/UI/Typography/Typography'
import { Box, styled, useTheme } from '@mui/material'
import { AllColors } from '@/style/types'
import { Props } from './types'
import { ReportDistributionData } from '@/service/types'

const GraphDescription = styled(Typography)`
  display: inline-flex;
  margin-bottom: ${(p) => p.theme.spacing(2)};
  position: relative;
  min-height: 24px;
  > span {
    display: inline-flex;
    align-items: center;
    margin-right: ${(p) => p.theme.spacing(2)};
  }
  .dot {
    border: 2px solid ${(p) => p.theme.colors.black};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: ${(p) => p.theme.spacing(1)};
  }
`

const colorOptions: AllColors[] = ['blue1', 'grey2', 'black']
const initialData: ReportDistributionData[] = [
  {
    name: 'On the job',
    value_percentage: 0
  },
  {
    name: 'Social',
    value_percentage: 0
  },
  {
    name: 'Formal',
    value_percentage: 0
  }
]

const LearningDistribution = ({
  barData = initialData,
  description,
  titleTip
}: Props) => {
  const { colors } = useTheme()

  const total = barData.reduce((p, c) => p + c.value_percentage, 0)

  const data = barData.map((item, i) => ({
    label: item.name,
    percentage: item.value_percentage && (item.value_percentage / total) * 100,
    color: item.color || colorOptions[i]
  }))

  return (
    <>
      <Typography variant="h2" component="h3" gutterBottom>
        Learning distribution
        {titleTip && (
          <Tooltip sx={{ p: 0 }} brandColor="brandLearning" title={titleTip} />
        )}
      </Typography>

      {description && (
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
      )}
      <GraphDescription variant="body2">
        {data.map(({ label, color, percentage }) => (
          <span key={label}>
            <Box
              className="dot"
              sx={{ backgroundColor: colors[color] }}
              component="span"
            />
            {label} ({(percentage || 0).toFixed()}%)
          </span>
        ))}
        <Tooltip
          brandColor="brandLearning"
          sx={{ p: 0 }}
          title={
            <>
              <Typography variant="body2">On the job</Typography> Self-taught learning by
              doing, for example reading policies and guidance, using tools and software
              to do your job
              <Typography variant="body2">Social</Typography>
              Learning from colleagues, job shadowing, mentoring, coaching, networks and
              communities
              <Typography variant="body2">Formal</Typography>
              Completing a course on Civil Service Learning, external training,
              professional qualifications
            </>
          }
        />
      </GraphDescription>
      <PercentageBar
        data={data}
        marks={[0, 25, 50, 75, 100].map((value) => ({
          value,
          label: value.toString()
        }))}
      />
    </>
  )
}

export default LearningDistribution
