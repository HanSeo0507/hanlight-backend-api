import { query, ValidationChain } from 'express-validator/check';

const deleteCalendarValidation: ValidationChain[] = [query('calendar_pk').isInt()];

export default deleteCalendarValidation;
