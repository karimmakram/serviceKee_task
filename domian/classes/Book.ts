export class Book {
  static chapters(nChapters: number = 30) {
    const obj = Object()
    for (let i = 1; i <= nChapters; i++) {
      obj[`chapter${i}`] = []
    }
    return obj
  }
}
