import { query, ValidationChain } from 'express-validator/check';

import { id, signKey } from '@Lib/pattern.json';

const existValidation: ValidationChain[] = [
  query('key').isIn(['id', 'signKey']),
  query('value')
    .isString()
    .custom((val, { req }) => {
      const idRegExp: RegExp = new RegExp(id);
      const signKeyRegExp: RegExp = new RegExp(signKey);

      if (req.query.key) {
        if (req.query.key === 'id') {
          return idRegExp.test(val);
        } else {
          return signKeyRegExp.test(val);
        }
      } else {
        return false;
      }
    }),
];

export default existValidation;
