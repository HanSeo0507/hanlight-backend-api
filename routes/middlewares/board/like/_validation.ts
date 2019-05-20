import { oneOf, query, ValidationChain } from 'express-validator/check';

const likeValidation = oneOf([
  [
    query('type')
      .isString()
      .custom(val => val === 'board'),
    query('board_pk').isInt(),
  ],
  [
    query('type')
      .isString()
      .custom(val => val === 'comment'),
    query('comment_pk').isInt(),
    query('board_pk').isInt(),
  ],
]);

export default likeValidation;
