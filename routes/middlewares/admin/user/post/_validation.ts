import { body, oneOf } from 'express-validator';

const postUserValidation = oneOf([
  [
    body('type')
      .isString()
      .custom(val => val === 'student'),
    body('name').isString(),
    body('major')
      .isString()
      .custom(val => ['I', 'H', 'G', 'N'].includes(val)),
    body('grade').isInt({ min: 1, max: 3 }),
    body('classNum').isInt({ min: 1, max: 2 }),
    body('studentNum').isInt({ min: 1, max: 30 }),
  ],
  [
    body('type')
      .isString()
      .custom(val => ['teacher', 'parent', 'graduate'].includes(val)),
    body('name').isString(),
  ],
]);

export default postUserValidation;
