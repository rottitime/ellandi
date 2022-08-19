import { Meta, Story } from '@storybook/react'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import AlphaBanner from './AlphaBanner'

export default {
  title: 'Ellandi/AlphaBanner',
  component: AlphaBanner,
  parameters: {
    // actions: {
    //   handles: ['click a']
    // },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    }
  }
} as Meta

const Template: Story = ({ ...args }) => {
  return (
    <ThemeProvider>
      <AlphaBanner {...args} />
    </ThemeProvider>
  )
}
export const Default = Template.bind({})
Default.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo quod perspiciatis nam repellat? Assumenda quasi minus illo, reiciendis ad suscipit quibusdam officia omnis, amet delectus cumque ut ea? Vel?'
}
