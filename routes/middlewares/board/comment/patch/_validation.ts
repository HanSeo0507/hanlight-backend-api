import { body, query, ValidationChain } from 'express-validator/check';

const patchCommentValidation: ValidationChain[] = [
  query('board_pk').isInt(),
  query('comment_pk').isInt(),
  body('content')
    .isString()
    .isLength({ max: 300 }),
];

export default patchCommentValidation;
