import { ComponentMeta, ComponentStory } from '@storybook/react'
import DatePicker from './DatePicker'

export default {
  title: 'Ellandi/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=8786%3A75076'
    }
  },
  argTypes: { onChange: { action: 'changed' } }
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = ({ ...args }) => (
  <DatePicker {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Select date'
}

export const Error = Template.bind({})
Error.args = {
  ...Default.args,
  error: true,
  helperText: 'Invalid value'
}
