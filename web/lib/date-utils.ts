import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export const splitMinutes = (
  totalMinutes: number,
  minutesPerDay = 1440 //24 hours per day
): { days: number; hours: number; minutes: number } => {
  console.log('before', { totalMinutes, minutesPerDay })

  const returnValue = {
    days: Math.floor(totalMinutes / minutesPerDay),
    hours: Math.floor((totalMinutes % minutesPerDay) / 60),
    // hours: Math.floor((totalMinutes / 60) % minutesPerDay),
    minutes: (totalMinutes % minutesPerDay) % 60
    // minutes: totalMinutes % 60
  }
  console.log(
    'after',
    { totalMinutes, minutesPerDay, returnValue },
    (totalMinutes % minutesPerDay) / 60
  )
  return returnValue
}

// export const splitMinutes = (
//   totalMinutes: number,
//   hoursPerDay = 24
// ): { days: number; hours: number; minutes: number } => {
//   const minutesValue = totalMinutes % 60
//   // const minutesValue = 14.399999999999977

//   return {
//     days: Math.floor(totalMinutes / hoursPerDay / 60),
//     hours: Math.floor((totalMinutes / 60) % hoursPerDay),
//     minutes: totalMinutes % 60
//   }
// }

export const minutesToHours = (minutes: number): number =>
  Math.round((minutes / 60) * 100) / 100

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
