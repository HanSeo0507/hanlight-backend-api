import { body, ValidationChain } from 'express-validator/check';

const postCalendarValidation: ValidationChain[] = [
  body('month').isInt({ min: 1, max: 12 }),
  body('date').isInt({ min: 1, max: 31 }),
  body('detail').isString(),
];

export default postCalendarValidation;
