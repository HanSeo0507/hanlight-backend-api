import { oneOf, query } from 'express-validator/check';

const getNoticeValidation = oneOf([
  [
    query('type')
      .isString()
      .custom(val => val === 'post'),
    query('id')
      .isNumeric()
      .isInt({ min: 1, max: 10000 }),
  ],
  [
    query('type')
      .isString()
      .custom(val => val === 'list'),
    query('page')
      .optional()
      .isInt({ min: 1, max: 1000 }),
    query('title')
      .optional()
      .isString()
      .isLength({ max: 100 }),
  ],
]);

export default getNoticeValidation;
