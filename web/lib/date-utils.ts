import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export const splitMinutes = (
  totalMinutes: number,
  minutesPerDay = 1440 //24 hours per day
): { days: number; hours: number; minutes: number } => ({
  days: Math.floor(totalMinutes / minutesPerDay),
  hours: Math.floor((totalMinutes % minutesPerDay) / 60),
  minutes: (totalMinutes % minutesPerDay) % 60
})

export const combineDaysMinutesHoursToMinutes = (
  days: number,
  hours: number,
  minutes: number,
  minutesPerDay = 1440
): number => {
  return days * minutesPerDay + hours * 60 + minutes
  //Math.round((days * minutesPerDay + hours) * 60 + minutes)
}

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
