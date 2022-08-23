/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, Typography, styled } from '@mui/material'
import theme from '@/style/theme'

const Wrapper = styled(Box)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .color-block {
    padding: 10px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
  }
`

const colors = Object.keys(theme.colors)

export default {
  title: 'Ellandi',
  component: Box,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9175%3A77890'
    }
  }
} as ComponentMeta<typeof Typography>

const TemplateAll: ComponentStory<typeof Typography> = (args) => (
  <Wrapper>
    {colors.map((color) => (
      <Box key={color}>
        <Box
          {...args}
          sx={{ backgroundColor: theme.colors[color] }}
          className="color-block"
        />
        <Typography>{color}</Typography>
      </Box>
    ))}
  </Wrapper>
)

export const Colours = TemplateAll.bind({})
Colours.args = {}
