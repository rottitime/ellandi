import { ComponentStory, ComponentMeta } from '@storybook/react'
import Chart from './Chart'

export default {
  title: 'Ellandi/Chart',
  component: Chart,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=8577%3A71615'
    }
  }
} as ComponentMeta<typeof Chart>

const Template: ComponentStory<typeof Chart> = (args) => <Chart {...args} />

export const Default = Template.bind({})
Default.args = {
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ]
  }
}

export const Pie = Template.bind({})
Pie.args = {
  data: {
    columns: [
      ['data1', 30],
      ['data2', 120]
    ],
    type: 'pie'
  }
}
