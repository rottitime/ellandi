import { ComponentMeta, ComponentStory } from '@storybook/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import LearningGoalBar from './LearningGoalBar'
import { Props } from './types'

export default {
  title: 'Ellandi/Chart/LearningGoalBar',
  component: LearningGoalBar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=10171%3A75622'
    }
  }
} as ComponentMeta<typeof LearningGoalBar>

const Template: ComponentStory<typeof LearningGoalBar> = (args) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false
          }
        }
      })
    }
  >
    <LearningGoalBar {...args} />
  </QueryClientProvider>
)

export const Default = Template.bind({})
Default.args = {
  disableFetch: true,
  days: 5,
  percentage: 50
} as Props

export const Success = Template.bind({})
Success.args = {
  disableFetch: true,
  days: 11,
  percentage: 110
} as Props
