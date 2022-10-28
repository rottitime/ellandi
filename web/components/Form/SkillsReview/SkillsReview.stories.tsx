import { ComponentMeta, ComponentStory } from '@storybook/react'
import SkillsReview from './SkillsReview'

export default {
  title: 'Ellandi/Forms/SkillsReview',
  component: SkillsReview,
  parameters: {
    backgrounds: {
      default: 'Ellandi dark grey'
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=12004%3A75898'
    }
  }
} as ComponentMeta<typeof SkillsReview>

const Template: ComponentStory<typeof SkillsReview> = ({ ...args }) => (
  <SkillsReview {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: [...Array(5).keys()].map((i) => ({
    id: `id${i}`,
    name: `Skill ${i}`,
    level: 'Ok',
    pending: true
  }))
}
