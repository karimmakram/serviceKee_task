import { Router, Request, Response } from 'express'
import { check } from 'express-validator'
export const bookRoute = Router()
import controller from '../Cotrollers/book.controller'
bookRoute.post(
  '/',
  [
    check('startingDate', 'invlid Date ,format should d/m/yyyy').isDate({
      format: 'd/m/yyyy'
    }),
    check('weekdays', 'must send weekdays as Array between 1-7').isArray({
      min: 1,
      max: 7
    }),
    check('sessions', 'please send number of sessions greater than 0').isInt({
      min: 1
    })
  ],
  (req: Request, res: Response) => controller.studyBook(req, res)
)
