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
      url: 'https://www.figma.com/file/WeQvrqCCo3rxUbQkxT31Q8/Ellandi-Prototype-V4?node-id=9818%3A85811'
    }
  },
  argTypes: { onClick: { action: 'clicked' } }
} as ComponentMeta<typeof Button>

const colors: ComponentProps<typeof Button>['color'][] = [
  'primary',
  'secondary',
  'error',
  'tertiary'
]

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
