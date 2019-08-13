import { oneOf, query } from 'express-validator/check';

const getRecruitValidation = oneOf([
  [
    query('type')
      .isString()
      .custom(val => val === 'list'),
    query('page').isInt(),
  ],
  [
    query('type')
      .isString()
      .custom(val => val === 'post'),
    query('recruit_pk').isInt(),
  ],
]);

export default getRecruitValidation;
