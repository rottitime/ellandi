import { MeSuggestedSkillsResponse } from '@/service/types'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import SkillsSuggest from './SkillsSuggest'

export default {
  title: 'Ellandi/SkillsSuggest',
  component: SkillsSuggest,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=11831%3A83526'
    }
    // controls: { include: ['value'] }
  }
} as ComponentMeta<typeof SkillsSuggest>

const data: MeSuggestedSkillsResponse = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipisicing',
  'elit.',
  'Veritatis',
  'vel',
  'quas',
  'mollitia',
  'aut',
  'ipsam'
]

const Template: ComponentStory<typeof SkillsSuggest> = (args) => (
  <SkillsSuggest {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data,
  max: 10
}
