import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'
import { Box } from '@mui/material'
import { ComponentProps } from 'react'

export default {
  title: 'Ellandi/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9818%3A85811'
    }
  },
  args: {
    variant: 'contained'
  },
  argTypes: { onClick: { action: 'clicked' } }
} as ComponentMeta<typeof Button>

const colors: ComponentProps<typeof Button>['color'][] = ['primary', 'secondary', 'error']

const TemplateAll: ComponentStory<typeof Button> = ({ ...args }) => (
  <>
    {colors.map((color) => (
      <Box key={color} sx={{ mb: 3 }}>
        <Button color={color} {...args}>
          {color}
        </Button>
      </Box>
    ))}
  </>
)

const TemplateSingle: ComponentStory<typeof Button> = ({ ...args }) => (
  <Button {...args} />
)

export const All = TemplateAll.bind({})
All.args = {}

export const Single = TemplateSingle.bind({})
Single.args = {
  ...All.args,
  children: 'Button'
}
