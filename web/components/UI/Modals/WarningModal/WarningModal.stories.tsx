import { ComponentMeta, ComponentStory } from '@storybook/react'
import WarningModal from './WarningModal'

export default {
  title: 'Ellandi/Modal',
  component: WarningModal,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    }
  }
} as ComponentMeta<typeof WarningModal>

const Template: ComponentStory<typeof WarningModal> = ({ ...args }) => (
  <WarningModal open={true} {...args} />
)

export const Warning = Template.bind({})
Warning.args = {
  title: 'Header text',
  confirmButton: 'Confrm',
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo quod perspiciatis nam repellat? Assumenda quasi minus illo, reiciendis ad suscipit quibusdam officia omnis, amet delectus cumque ut ea? Vel?'
}
