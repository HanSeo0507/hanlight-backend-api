import { query, ValidationChain } from 'express-validator/check';

const deleteRecruitValidation: ValidationChain[] = [query('recruit_pk').isInt()];

export default deleteRecruitValidation;
