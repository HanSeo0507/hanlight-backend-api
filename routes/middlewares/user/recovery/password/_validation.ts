import { body, ValidationChain } from 'express-validator/check';

import { id, password } from '@Lib/pattern.json';

const recoveryPwValidation: ValidationChain[] = [
  body('code').isString(),
  body('id')
    .isString()
    .matches(id),
];

export default recoveryPwValidation;
