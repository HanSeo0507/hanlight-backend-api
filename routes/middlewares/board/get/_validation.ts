import { query, ValidationChain } from 'express-validator/check';

const getBoardValidation: ValidationChain[] = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 1000 }),
];

export default getBoardValidation;
