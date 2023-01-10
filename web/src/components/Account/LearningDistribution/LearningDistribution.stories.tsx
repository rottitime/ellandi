import { ComponentMeta, ComponentStory } from '@storybook/react'
import LearningDistribution from './LearningDistribution'

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

export const Default: ComponentStory<typeof LearningDistribution> = Template.bind({})
Default.args = {
  barData: [
    {
      name: 'On the job',
      value_percentage: 20
    },
    {
      name: 'Social',
      value_percentage: 22
    },
    {
      name: 'Formal',
      value_percentage: 58
    }
  ]
}

export const Empty: ComponentStory<typeof LearningDistribution> = Template.bind({})
Empty.args = {
  barData: [
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
}
