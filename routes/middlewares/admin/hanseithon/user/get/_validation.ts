import { body, ValidationChain } from 'express-validator/check';

const hanseithonGetUserValidation: ValidationChain[] = [body('user_pk').isUUID()];

export default hanseithonGetUserValidation;
