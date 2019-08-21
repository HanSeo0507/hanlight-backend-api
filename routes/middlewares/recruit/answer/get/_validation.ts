import { query, ValidationChain } from 'express-validator/check';

const getAnswerValidation: ValidationChain[] = [query('answerer_pk').isInt(), query('recruit_pk').isInt()];

export default getAnswerValidation;
