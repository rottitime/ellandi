import { ComponentMeta, ComponentStory } from '@storybook/react'
import LinearProgress from './LinearProgress'

export default {
  title: 'Ellandi/LinearProgress',
  component: LinearProgress,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    },
    controls: { include: ['value'] }
  }
} as ComponentMeta<typeof LinearProgress>

const Template: ComponentStory<typeof LinearProgress> = (args) => (
  <LinearProgress {...args} />
)

export const Default = Template.bind({})
Default.args = {
  variant: 'determinate',
  value: 10
}
