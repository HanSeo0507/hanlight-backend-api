import { body, ValidationChain } from 'express-validator/check';

import { password } from '@Lib/pattern.json';

const userPatchPassword: ValidationChain[] = [
  body('password')
    .isString()
    .matches(password),
];

export default userPatchPassword;
