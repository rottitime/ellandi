import { ComponentMeta, ComponentStory } from '@storybook/react'
import LearningDistribution from './LearningDistribution'
import { Props } from './types'

export default {
  title: 'Ellandi/Chart/LearningDistribution',
  component: LearningDistribution,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=10171%3A75622'
    }
  }
} as ComponentMeta<typeof LearningDistribution>

const Template: ComponentStory<typeof LearningDistribution> = (args) => (
  <LearningDistribution {...args} />
)

export const Default = Template.bind({})
Default.args = {
  barData: [
    {
      name: 'On the job',
      value_percentage: 10,
      color: null
    },
    {
      name: 'Social',
      value_percentage: 68,
      color: null
    },
    {
      name: 'Formal',
      value_percentage: 22,
      color: null
    }
  ]
} as Props
