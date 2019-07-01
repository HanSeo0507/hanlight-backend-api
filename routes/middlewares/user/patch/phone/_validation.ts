import { body, ValidationChain } from 'express-validator/check';

import { tp } from '@Lib/pattern.json';

const userPatchPhone: ValidationChain[] = [body('code').isString()];

export default userPatchPhone;
