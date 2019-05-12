import { query } from 'express-validator/check';

const getMealValidation = [query('sort').isIn(['week', 'month'])];

export default getMealValidation;
