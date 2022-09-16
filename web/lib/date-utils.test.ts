import { splitDays, combineDaysMinutesHoursToDays } from './date-utils'

describe('splitDays()', () => {
  it('returns correct value', () => {
    expect(splitDays(0)).toMatchObject({ days: 0, hours: 0, minutes: 0 })
    expect(splitDays(2.5)).toMatchObject({ days: 2, hours: 12, minutes: 0 })
    expect(splitDays(2.6)).toMatchObject({ days: 2, hours: 14, minutes: 24 })
    expect(splitDays(2.08)).toMatchObject({ days: 2, hours: 1, minutes: 55 })
    expect(splitDays(2.04)).toMatchObject({ days: 2, hours: 0, minutes: 57 })
  })
})

describe('combineDaysMinutesHoursToDays()', () => {
  it('returns correct value', () => {
    expect(combineDaysMinutesHoursToDays(0, 0, 0)).toEqual(0)
    expect(combineDaysMinutesHoursToDays(2, 12, 0)).toEqual(2.5)
    expect(combineDaysMinutesHoursToDays(2, 14, 24)).toEqual(2.6)
    expect(combineDaysMinutesHoursToDays(2, 1, 55)).toEqual(2.08)
    expect(combineDaysMinutesHoursToDays(2, 0, 57)).toEqual(2.04)
  })
})
