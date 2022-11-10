import { ComponentMeta, ComponentStory } from '@storybook/react'
import SplitButton from './SplitButton'

export default {
  title: 'Ellandi/SplitButton',
  component: SplitButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=11476%3A76089'
    }
  }
} as ComponentMeta<typeof SplitButton>

const Template: ComponentStory<typeof SplitButton> = (args) => <SplitButton {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Select merge strategy',
  options: ['Create a merge commit', 'Squash and merge', 'Rebase and merge']
}
