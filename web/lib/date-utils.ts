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
  minutes: number
): number => days * 1440 + hours * 60 + minutes
