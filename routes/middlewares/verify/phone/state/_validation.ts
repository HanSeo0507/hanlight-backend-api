import { body, ValidationChain } from 'express-validator/check';

const stateValidation: ValidationChain[] = [body('signKey').isString()];

export default stateValidation;
