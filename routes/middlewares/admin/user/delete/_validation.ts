import { query, ValidationChain } from 'express-validator/check';

const deleteUserValidation: ValidationChain[] = [query('user_pk').isUUID()];

export default deleteUserValidation;
