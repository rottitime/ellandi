import { ComponentMeta, ComponentStory } from '@storybook/react'
import GovCard from './GovCard'

export default {
  title: 'Ellandi/Cards/GovCard',
  component: GovCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62438'
    }
  },
  argTypes: {
    progress: {
      name: 'size',
      description: 'Size which maintans the ratio',
      control: { type: 'range', min: 0, max: 100 }
    }
  }
} as ComponentMeta<typeof GovCard>

const Template: ComponentStory<typeof GovCard> = ({ ...args }) => <GovCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'My title',
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo quod perspiciatis nam repellat? Assumenda quasi minus illo, reiciendis ad suscipit quibusdam officia omnis, amet delectus cumque ut ea? Vel?'
}

export const ProgressBar = Template.bind({})
ProgressBar.args = {
  ...Default.args,
  progress: 10
}
