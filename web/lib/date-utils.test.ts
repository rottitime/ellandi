import {
  splitMinutes,
  combineDaysMinutesHoursToMinutes,
  isBetweenBusinessDates
} from './date-utils'

describe('splitMinutes()', () => {
  it('based on 24 hours a day', () => {
    expect(splitMinutes(0)).toMatchObject({ days: 0, hours: 0, minutes: 0 })
    expect(splitMinutes(25)).toMatchObject({ days: 0, hours: 0, minutes: 25 })
    expect(splitMinutes(70)).toMatchObject({ days: 0, hours: 1, minutes: 10 })
    expect(splitMinutes(1440)).toMatchObject({ days: 1, hours: 0, minutes: 0 })
    expect(splitMinutes(11208)).toMatchObject({ days: 7, hours: 18, minutes: 48 })
  })

  it('based on 7.24 hours a day', () => {
    const hoursPerDay = 7.24
    expect(splitMinutes(0, hoursPerDay)).toMatchObject({ days: 0, hours: 0, minutes: 0 })
    expect(splitMinutes(25, hoursPerDay)).toMatchObject({
      days: 0,
      hours: 0,
      minutes: 25
    })
    expect(splitMinutes(434.4, hoursPerDay)).toMatchObject({
      days: 1,
      hours: 0,
      minutes: 0
    })
    // expect(splitMinutes(1440, hoursPerDay)).toMatchObject({
    //   days: 1,
    //   hours: 0,
    //   minutes: 0
    // })
    // expect(splitMinutes(11208, hoursPerDay)).toMatchObject({
    //   days: 7,
    //   hours: 18,
    //   minutes: 48
    // })
  })
})

describe('combineDaysMinutesHoursToMinutes()', () => {
  it('returns correct value', () => {
    expect(combineDaysMinutesHoursToMinutes(0, 0, 0)).toEqual(0)
    expect(combineDaysMinutesHoursToMinutes(0, 0, 25)).toEqual(25)
    expect(combineDaysMinutesHoursToMinutes(0, 1, 10)).toEqual(70)
    expect(combineDaysMinutesHoursToMinutes(7, 18, 48)).toEqual(11208)
  })

  it('based on 7.5 hours a day', () => {
    const hoursPerDay = 7.5
    expect(combineDaysMinutesHoursToMinutes(0, 0, 0, hoursPerDay)).toEqual(0)
    expect(combineDaysMinutesHoursToMinutes(0, 0, 25, hoursPerDay)).toEqual(25)
    expect(combineDaysMinutesHoursToMinutes(0, 0, 450, hoursPerDay)).toEqual(450)
    expect(combineDaysMinutesHoursToMinutes(0, 7.5, 0, hoursPerDay)).toEqual(450)
    expect(combineDaysMinutesHoursToMinutes(1, 0, 0, hoursPerDay)).toEqual(450)
    expect(combineDaysMinutesHoursToMinutes(2, 0, 0, hoursPerDay)).toEqual(900)
    expect(combineDaysMinutesHoursToMinutes(0, 1, 10, hoursPerDay)).toEqual(70)
    expect(combineDaysMinutesHoursToMinutes(7, 18, 48, hoursPerDay)).toEqual(4278)
  })

  it('based on 7.24 hours a day', () => {
    const hoursPerDay = 7.24
    expect(combineDaysMinutesHoursToMinutes(0, 0, 0, hoursPerDay)).toEqual(0)
    expect(combineDaysMinutesHoursToMinutes(0, 0, 25, hoursPerDay)).toEqual(25)
    expect(combineDaysMinutesHoursToMinutes(0, 0, 450, hoursPerDay)).toEqual(450)
    expect(combineDaysMinutesHoursToMinutes(0, 7.5, 0, hoursPerDay)).toEqual(450)

    expect(combineDaysMinutesHoursToMinutes(1, 0, 0, hoursPerDay)).toEqual(434)
    expect(combineDaysMinutesHoursToMinutes(2, 0, 0, hoursPerDay)).toEqual(869)
    expect(combineDaysMinutesHoursToMinutes(0, 1, 10, hoursPerDay)).toEqual(70)
    expect(combineDaysMinutesHoursToMinutes(7, 18, 48, hoursPerDay)).toEqual(4169)
  })
})

describe('isBetweenBusinessDates()', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-10-19'))
  it('returns correct value', () => {
    expect(isBetweenBusinessDates('2022-10-03', '2022-04-01', '2023-03-31')).toBeTruthy()
    expect(isBetweenBusinessDates('2022-10-03', '2020-04-01', '2020-03-31')).toBeTruthy()

    expect(isBetweenBusinessDates('2022-02-03', '2022-04-01', '2023-03-31')).toBeFalsy()
    expect(isBetweenBusinessDates('2023-11-09', '2022-04-01', '2022-11-30')).toBeFalsy()
    expect(isBetweenBusinessDates('2024-02-03', '2022-04-01', '2023-03-31')).toBeFalsy()
  })
})
