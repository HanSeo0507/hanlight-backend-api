import { query, ValidationChain } from 'express-validator/check';

const patchApproveValidation: ValidationChain[] = [query('approve_pk').isInt()];

export default patchApproveValidation;
