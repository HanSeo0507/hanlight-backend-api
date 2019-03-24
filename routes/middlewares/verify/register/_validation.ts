import { body, ValidationChain } from 'express-validator/check';

const registerValidation: ValidationChain[] = [body('id').isString(), body('password').isString(), body('signKey').isString()];

export default registerValidation;
