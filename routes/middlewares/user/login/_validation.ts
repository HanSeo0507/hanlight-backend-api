import { body, ValidationChain } from 'express-validator/check';

const loginValidation: ValidationChain[] = [body('id').isString(), body('password').isString()];

export default loginValidation;
