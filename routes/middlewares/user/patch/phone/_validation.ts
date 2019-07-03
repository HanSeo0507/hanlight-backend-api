import { body, ValidationChain } from 'express-validator/check';

const userPatchPhone: ValidationChain[] = [body('code').isString()];

export default userPatchPhone;
