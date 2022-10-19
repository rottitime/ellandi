import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export const splitDays = (
  totalDays: number
): { days: number; hours: number; minutes: number } => {
  const days = Math.floor(totalDays)
  const remainder = totalDays - days
  const remainderHours = remainder * 24

  return {
    days,
    hours: Math.floor(remainderHours),
    minutes: Math.floor((remainderHours % 1) * 60)
  }
}

export const combineDaysMinutesHoursToDays = (
  days: number,
  hours: number,
  minutes: number
): number => {
  const hoursAsDays = hours / 24
  const minutesAsDays = minutes / 1440
  const total = days + hoursAsDays + minutesAsDays

  return Math.round(total * 100) / 100
}

export const splitMinutes = (
  totalMinutes: number
): { days: number; hours: number; minutes: number } => ({
  days: Math.floor(totalMinutes / 24 / 60),
  hours: Math.floor((totalMinutes / 60) % 24),
  minutes: totalMinutes % 60
})

export const combineDaysMinutesHoursToMinutes = (
  days: number,
  hours: number,
  minutes: number,
  hoursPerDay = 24
): number => (days * hoursPerDay + hours) * 60 + minutes

export const isBetweenBusinessDates = (
  date: string,
  startDate: string,
  endDate: string,
  replaceWithCurrentYear = true
): boolean => {
  const currentYear = dayjs().year()
  let newStartDate = dayjs(startDate)
  let newEndDate = dayjs(endDate)

  if (replaceWithCurrentYear) {
    newStartDate = dayjs().isBefore(newStartDate.set('year', currentYear))
      ? newStartDate.set('year', currentYear - 1)
      : newStartDate.set('year', currentYear)
    newEndDate = dayjs().isAfter(newEndDate.set('year', currentYear))
      ? newEndDate.set('year', currentYear + 1)
      : newEndDate.set('year', currentYear)
  }

  return dayjs(date).isBetween(newStartDate, newEndDate, 'day', '[]')
}
