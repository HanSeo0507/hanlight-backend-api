import { body, ValidationChain } from 'express-validator/check';

const phoneValidation: ValidationChain[] = [body('code').isString(), body('signKey').isString()];

export default phoneValidation;
