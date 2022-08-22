import { ComponentMeta, ComponentStory } from '@storybook/react'
import AppBar from './AppBar'

export default {
  title: 'Ellandi/AppBar',
  component: AppBar,
  parameters: {
    // actions: {
    //   handles: ['click a']
    // },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    }
  }
} as ComponentMeta<typeof AppBar>

const Template: ComponentStory<typeof AppBar> = ({ ...args }) => <AppBar {...args} />

export const Default = Template.bind({})
Default.args = {
  logoUrl: '#',
  pages: [
    { title: 'Link 1', url: '#' },
    {
      title: 'Link 2',
      url: '#'
    }
  ],
  settings: [
    { title: 'Profile', url: '#' },
    { title: 'Logout', url: '#' }
  ]
}
