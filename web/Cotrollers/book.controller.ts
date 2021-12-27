import { Request, Response } from 'express'
import { BookService } from '../../domian/service/bookService'
import { validationResult } from 'express-validator'
class BookController {
  private service = new BookService()
  studyBook(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) })
    }
    try {
      const {
        startingDate,
        weekdays,
        sessions
      }: {
        startingDate: string
        weekdays: number[]
        sessions: number
      } = req.body
      res.json(this.service.planStudy(startingDate, weekdays, sessions))
    } catch (error) {
      res
        .status(400)
        .json({
          error: error instanceof Error ? error.message : 'invalid data'
        })
    }
  }
}

export default new BookController()
