import { query, ValidationChain } from 'express-validator/check';

const deleteApproveValidation: ValidationChain[] = [query('approve_pk').isInt()];

export default deleteApproveValidation;
