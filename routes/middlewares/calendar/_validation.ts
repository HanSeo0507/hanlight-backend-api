import { query } from 'express-validator/check';

const getCalendarValidation = [query('month').isInt({ min: 1, max: 12 })];

export default getCalendarValidation;
