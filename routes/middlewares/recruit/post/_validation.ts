import { body, ValidationChain } from 'express-validator/check';

const type = ['short', 'long', 'select'];

const postRecruitValidation: ValidationChain[] = [
  body('questions')
    .isArray()
    .custom(
      (val: any[]) =>
        val &&
        val.length > 0 &&
        val.length <= 30 &&
        val.every(
          value =>
            typeof value === 'object' &&
            (value.type && type.includes(value.type)) &&
            (value.question && typeof value.question === 'string' && value.question.length <= 100) &&
            (value.type !== 'select' ||
              (value.selects &&
                Array.isArray(value.selects) &&
                value.selects.length <= 5 &&
                value.selects.length > 0 &&
                value.selects.every(val => typeof val === 'string' && val.length <= 20)))
        )
    ),
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
      const date = new Date(val);
      if (date instanceof Date) {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        return new Date() < new Date(val);
      } else {
        return false;
      }
    }),
];

export default postRecruitValidation;
