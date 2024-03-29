import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import AccountCard from './AccountCard'

export default {
  title: 'Ellandi/Cards/AccountCard',
  component: AccountCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9324%3A78304'
    },
    backgrounds: {
      default: 'Ellandi light'
    }
  }
} as ComponentMeta<typeof AccountCard>

const Template: ComponentStory<typeof AccountCard> = (args) => <AccountCard {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo quod perspiciatis nam repellat? Assumenda quasi minus illo, reiciendis ad suscipit quibusdam officia omnis, amet delectus cumque ut ea? Vel?'
}

export const BrandingHeader = Template.bind({})
BrandingHeader.args = {
  ...Default.args,
  color: 'brandSkills',
  header: (
    <Typography variant="h1" component="h3">
      Latest updates
    </Typography>
  )
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  loading: true
}

export const ActionButtons = Template.bind({})
ActionButtons.args = {
  ...Default.args,
  action: (
    <>
      <button>Button 1</button>
      <button>Button 2</button>
    </>
  )
}
