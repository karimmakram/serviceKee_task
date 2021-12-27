export class DateFormat {
  static formatDate(date: string) {
    return new Date(this.splitDate(date))
  }
  private static splitDate(date: string): string {
    const splitDate = date.split('/')
    const temp = splitDate[0]
    splitDate[0] = splitDate[1]
    splitDate[1] = temp
    return splitDate.join('/')
  }
  static formatDay(day: number) {
    return ((day + 1) % 7) + 1
  }
}
