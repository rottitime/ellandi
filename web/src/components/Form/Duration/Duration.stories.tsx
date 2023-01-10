import { ComponentMeta, ComponentStory } from '@storybook/react'
import Duration from './Duration'

export default {
  title: 'Ellandi/Forms/Duration',
  component: Duration,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/WeQvrqCCo3rxUbQkxT31Q8/Ellandi-Prototype-V4?node-id=10150%3A62998'
    }
  },
  argTypes: { onChange: { action: 'changed' } }
} as ComponentMeta<typeof Duration>

const Template: ComponentStory<typeof Duration> = ({ ...args }) => <Duration {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Error = Template.bind({})
Error.args = {
  ...Default.args,
  error: true,
  helperText: 'Invalid value'
}
