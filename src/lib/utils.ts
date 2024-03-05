import { format, isToday, parse } from "date-fns"

export const DATE_FORMAT = 'dd/MM/yyyy'

export const formatDate = (d: Date): string => format(d, DATE_FORMAT)

export const getRandomUUID = (): string => {
  return window.crypto.randomUUID()
}

export const parseDate = (date: string): Date => parse(date, DATE_FORMAT, new Date())

export const isTodayDay = (day: string | null): boolean => {
  if (day === null) {
    return false
  }
  return isToday(parseDate(day))
}
