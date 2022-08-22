import { ComponentMeta, ComponentStory } from '@storybook/react'
import ToggleChip from './ToggleChip'

export default {
  title: 'Ellandi/ToggleChip',
  component: ToggleChip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9204%3A77733'
    }
  },
  argTypes: {}
} as ComponentMeta<typeof ToggleChip>

const Template: ComponentStory<typeof ToggleChip> = ({ ...args }) => (
  <ToggleChip {...args} />
)

export const Default = Template.bind({})
Default.args = {
  toggle: true,
  label: 'Chip'
}

export const AvatarText = Template.bind({})
AvatarText.args = {
  ...Default.args,
  avatarText: 'C'
}
