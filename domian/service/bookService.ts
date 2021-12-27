import { DateFormat } from '../classes/DateFormat'
import { Book } from '../classes/Book'

export class BookService {
  planStudy(date: string, weekdays: number[], sessions: number) {
    if (!this.weekdaysValid(weekdays)) {
      throw new Error('weekdays should be from 1 to 7 and dont duplicate')
    }
    // if weekdays not sorted will sort it
    weekdays = weekdays.sort((a, b) => a - b)

    let startDate: Date = DateFormat.formatDate(date)
    let top: number = this.findStartDayIndex(
      DateFormat.formatDay(startDate.getDay()),
      weekdays
    )
    const pattern = this.findPattern(weekdays)
    while (DateFormat.formatDay(startDate.getDay()) != weekdays[top]) {
      startDate.setDate(startDate.getDate() + 1)
    }
    const chaptersObj = Book.chapters()
    for (const ch in chaptersObj) {
      for (let i = 0; i < sessions; i++) {
        chaptersObj[ch].push(startDate.toLocaleDateString('en-GB'))
        startDate.setDate(startDate.getDate() + pattern[top])
        top = (top + 1) % pattern.length
      }
    }

    return chaptersObj
  }

  private findStartDayIndex(day: number, ArDays: number[]) {
    for (let i = 0; i < ArDays.length; i++) {
      if (ArDays[i] >= day) return i
    }
    return 0
  }

  private findPattern(ArDays: number[]) {
    if (ArDays.length == 1) return [7]
    let pattern = []
    for (let i = 0; i < ArDays.length; i++) {
      // to get absulte value
      pattern.push((ArDays[(i + 1) % ArDays.length] - ArDays[i] + 7) % 7)
    }
    return pattern
  }
  private weekdaysValid(weekdays: number[]) {
    const s = String(weekdays)
    for (let i = 0; i < weekdays.length; i++) {
      if (weekdays[i] > 7 || weekdays[i] < 1) return false

      // if duplicate send error
      const regex = new RegExp(weekdays[i] + '', 'g')
      if (s.replace(regex, '').length !== s.length - 1) {
        return false
      }
    }
    return true
  }
}
