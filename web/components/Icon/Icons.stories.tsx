import { ComponentStory, Meta } from '@storybook/react'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import Icon, { icons } from './Icon'
import { IconsType } from './types'
import { Box } from '@mui/material'

export default {
  title: 'Ellandi/Icon',
  component: Icon,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9175%3A77990'
    }
  },
  args: {
    size: 60
  },
  argTypes: {
    color: {
      name: 'color',
      control: { type: 'color' }
    },
    size: {
      name: 'size',
      description: 'Size which maintans the ratio',
      control: { type: 'range', min: 0, max: 100 }
    }
  }
} as Meta

const TemplateAll: ComponentStory<typeof Icon> = ({ ...args }) => (
  <ThemeProvider>
    <Box style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {Object.keys(icons).map((icon) => (
        <Icon {...args} icon={icon as IconsType} key={icon} />
      ))}
    </Box>
  </ThemeProvider>
)

const Template: ComponentStory<typeof Icon> = ({ ...args }) => (
  <ThemeProvider>
    <Icon {...args} />
  </ThemeProvider>
)

export const All = TemplateAll.bind({})
All.args = {}
All.parameters = { controls: { exclude: ['icon'] } }

export const Single = Template.bind({})
Single.args = {
  icon: 'crown-logo'
}
