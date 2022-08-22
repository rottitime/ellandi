import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory, Meta, Story } from '@storybook/react'
import AccountCard from './AccountCard'

export default {
  title: 'Ellandi/Cards/AccountCard',
  component: AccountCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9890%3A62450'
    }
  }
} as ComponentMeta<typeof AccountCard>

const Template: ComponentStory<typeof AccountCard> = ({ ...args }) => (
  <AccountCard {...args} />
)

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
