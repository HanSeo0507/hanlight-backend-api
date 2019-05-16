import { body, oneOf, query } from 'express-validator/check';

const reportValidation = oneOf([
  [
    query('type')
      .isString()
      .custom(val => val === 'board'),
    query('board_pk').isInt(),
    body('content')
      .optional()
      .isString()
      .isLength({ max: 300 }),
  ],
  [
    query('type')
      .isString()
      .custom(val => val === 'comment'),
    query('board_pk').isInt(),
    query('comment_pk').isInt(),
    body('content')
      .optional()
      .isString()
      .isLength({ max: 300 }),
  ],
]);

export default reportValidation;
