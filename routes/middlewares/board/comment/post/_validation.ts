import { body, query } from 'express-validator/check';

const PostCommentValidation = [
  query('board_pk').isInt(),
  body('content')
    .isString()
    .isLength({ max: 300 }),
];

export default PostCommentValidation;
