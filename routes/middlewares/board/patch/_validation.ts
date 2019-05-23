import { body, ValidationChain } from 'express-validator/check';

const patchBoardValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('content')
    .isString()
    .isLength({ max: 600 }),
];

export default patchBoardValidation;
