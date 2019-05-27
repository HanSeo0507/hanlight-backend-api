import { body, ValidationChain } from 'express-validator/check';

const deleteBoardValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('content')
    .optional()
    .isString(),
];

export default deleteBoardValidation;
