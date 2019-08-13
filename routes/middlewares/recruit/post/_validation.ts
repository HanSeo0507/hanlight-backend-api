import { body, ValidationChain } from 'express-validator/check';

const postRecruitValidation: ValidationChain[] = [
  body('questions')
    .isArray()
    .custom((val: any[]) => val && val.length > 0 && val.every(value => typeof value === 'string')),
  body('name')
    .isString()
    .isLength({ max: 15 }),
  body('description')
    .isString()
    .isLength({ max: 300 }),
  body('dueAt')
    .optional()
    .isString()
    .custom((val: string) => {
      return new Date(val) instanceof Date && new Date() < new Date(val);
    }),
];

export default postRecruitValidation;
