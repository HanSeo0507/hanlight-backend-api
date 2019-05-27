import { body, ValidationChain } from 'express-validator/check';

const postNoticeValidation: ValidationChain[] = [body('title').isString(), body('content').isString()];

export default postNoticeValidation;
