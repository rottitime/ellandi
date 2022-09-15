import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ComponentProps } from 'react'
import Tabs from './Tabs'

const mockData: ComponentProps<typeof Tabs>['tabItems'] = [
  {
    title: 'Tab1',
    content: <div>Tab one</div>
  },
  {
    title: 'Tab2',
    content: <div>Tab two</div>
  },
  {
    title: 'Tab3',
    disabled: true,
    content: <div>Tab three</div>
  },
  {
    title: 'Tab4',
    content: <div>Tab four</div>
  }
]

export default {
  title: 'Ellandi/Tabs',
  component: Tabs,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9202%3A77709'
    }
  }
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  tabItems: mockData
}
