import { ComponentMeta, ComponentStory } from '@storybook/react'
import WarningDialog from './WarningDialog'

export default {
  title: 'Ellandi/Modal',
  component: WarningDialog,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    }
  }
} as ComponentMeta<typeof WarningDialog>

const Template: ComponentStory<typeof WarningDialog> = (args) => (
  <WarningDialog open={true} {...args} />
)

export const Warning = Template.bind({})
Warning.args = {
  title: 'Header text',
  confirmButton: 'Confrm',
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo quod perspiciatis nam repellat? Assumenda quasi minus illo, reiciendis ad suscipit quibusdam officia omnis, amet delectus cumque ut ea? Vel?'
}
