import { query, ValidationChain } from 'express-validator/check';

const GetNoticeValidation: ValidationChain[] = [
  query('page')
    .optional()
    .isInt(),
];

export default GetNoticeValidation;
