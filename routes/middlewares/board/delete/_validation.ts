import { query, ValidationChain } from 'express-validator/check';

const deleteBoardValidation: ValidationChain[] = [query('pk').isInt()];

export default deleteBoardValidation;
