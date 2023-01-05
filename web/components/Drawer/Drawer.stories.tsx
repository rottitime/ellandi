import { ComponentMeta, ComponentStory } from '@storybook/react'
import Drawer, { Props } from './Drawer'

export default {
  title: 'Ellandi/Drawer',
  component: Drawer,
  parameters: {
    // actions: {
    //   handles: ['click a']
    // },
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    // }
  }
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = ({ ...args }) => <Drawer {...args} />

export const Default = Template.bind({})
Default.args = {
  anchor: 'right',
  open: true,
  pages: [
    { title: 'Link 1', url: '#', icon: 'case' },
    {
      title: 'Link 2',
      url: '#',
      icon: 'account-circle'
    }
  ],
  settings: [
    { title: 'Profile', url: '#', icon: 'profile' },
    { title: 'Logout', url: '#', icon: 'exit' }
  ]
} as Props
