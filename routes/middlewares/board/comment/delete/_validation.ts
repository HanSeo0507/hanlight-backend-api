import { query, ValidationChain } from 'express-validator/check';

const deleteCommentValidation: ValidationChain[] = [query('board_pk').isInt(), query('comment_pk').isInt()];

export default deleteCommentValidation;
