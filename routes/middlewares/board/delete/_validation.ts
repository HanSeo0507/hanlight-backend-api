import { query, ValidationChain } from 'express-validator/check';

const deleteBoardValidation: ValidationChain[] = [query('board_pk').isInt()];

export default deleteBoardValidation;
