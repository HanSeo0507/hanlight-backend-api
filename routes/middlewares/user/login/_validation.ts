import { body, ValidationChain } from 'express-validator/check';

import { id, password } from '@Lib/pattern.json';

const loginValidation: ValidationChain[] = [
  body('id')
    .isString()
    .matches(id),
  body('password')
    .isString()
    .matches(password),
];

export default loginValidation;
