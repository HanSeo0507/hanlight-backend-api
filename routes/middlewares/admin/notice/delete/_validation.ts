import { query, ValidationChain } from 'express-validator/check';

const deleteNoticeValidation: ValidationChain[] = [query('notice_pk').isInt()];

export default deleteNoticeValidation;
