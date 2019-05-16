import { body, query, ValidationChain } from 'express-validator/check';

const patchBoardValidation: ValidationChain[] = [
  query('pk').isInt(),
  body('content')
    .isString()
    .isLength({ max: 600 }),
];

export default patchBoardValidation;
