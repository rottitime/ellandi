import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tooltip from './Tooltip'

export default {
  title: 'Ellandi/Tooltip',
  component: Tooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/WeQvrqCCo3rxUbQkxT31Q8/Ellandi-Prototype-V4?node-id=9324%3A78111'
    }
  }
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'My tooltip text'
}
