import { body, ValidationChain } from 'express-validator/check';

const recoveryIdValidation: ValidationChain[] = [body('code').isString()];

export default recoveryIdValidation;
