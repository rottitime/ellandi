import { ComponentStory, ComponentMeta } from '@storybook/react'
import PercentageBar from './PercentageBar'
import { Props } from './types'

export default {
  title: 'Ellandi/PercentageBar',
  component: PercentageBar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/WeQvrqCCo3rxUbQkxT31Q8/Ellandi-Prototype-V4?node-id=10171%3A75622'
    }
  }
} as ComponentMeta<typeof PercentageBar>

const Template: ComponentStory<typeof PercentageBar> = (args) => (
  <PercentageBar {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: [
    { percentage: 30, label: 'Pizza', color: 'blue1' },
    { percentage: 15, label: 'Chips', color: 'white' },
    { percentage: 55, label: 'Hash browns', color: 'brandSkills' }
  ]
} as Props

export const WithMarks = Template.bind({})
WithMarks.args = {
  ...Default.args,
  marks: [
    { value: 0, label: '0°C' },
    { value: 20, label: '20°C' },
    { value: 37, label: '37°C' },
    { value: 100, label: '100°C' }
  ]
}
