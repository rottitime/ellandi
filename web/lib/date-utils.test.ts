import {
  splitDays,
  combineDaysMinutesHoursToDays,
  splitMinutes,
  combineDaysMinutesHoursToMinutes
} from './date-utils'

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

describe('splitMinutes()', () => {
  it('returns correct value', () => {
    expect(splitMinutes(0)).toMatchObject({ days: 0, hours: 0, minutes: 0 })
    expect(splitMinutes(25)).toMatchObject({ days: 0, hours: 0, minutes: 25 })
    expect(splitMinutes(70)).toMatchObject({ days: 0, hours: 1, minutes: 10 })
    expect(splitMinutes(11208)).toMatchObject({ days: 7, hours: 18, minutes: 48 })
  })
})

describe('combineDaysMinutesHoursToMinutes()', () => {
  it('returns correct value', () => {
    expect(combineDaysMinutesHoursToMinutes(0, 0, 0)).toEqual(0)
    expect(combineDaysMinutesHoursToMinutes(0, 0, 25)).toEqual(25)
    expect(combineDaysMinutesHoursToMinutes(0, 1, 10)).toEqual(70)
    expect(combineDaysMinutesHoursToMinutes(7, 18, 48)).toEqual(11208)
  })
})
