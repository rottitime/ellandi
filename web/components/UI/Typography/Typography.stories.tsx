/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, Typography, styled } from '@mui/material'
import theme from '@/style/theme'

const Row = styled(Box)`
  padding: 10px 0;
`

const variants = Object.entries(theme.typography)
  .filter(([_key, value]) => typeof value === 'object')
  .map(([key]) => key)

// type Variants = typeof variants[number]

export default {
  title: 'Ellandi/Typography',
  component: Typography,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9175%3A77890'
    }
  }
} as ComponentMeta<typeof Typography>

const TemplateAll: ComponentStory<typeof Typography> = (args) => (
  <>
    {variants.map((variant) => (
      <Row key={variant}>
        <Typography variant={variant as any} {...args}>
          {variant}
        </Typography>
      </Row>
    ))}
  </>
)

const TemplateSingle: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
)

export const All = TemplateAll.bind({})
All.args = {}
// All.parameters = { controls: { exclude: ['Typography'] } }

export const Single = TemplateSingle.bind({})
Single.args = {
  variant: 'display',
  children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, quasi.'
}