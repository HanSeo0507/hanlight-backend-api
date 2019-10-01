import { body, ValidationChain } from 'express-validator';

export interface Body {
  singer_pk: number;
}

const postSingerVoteValidation: ValidationChain[] = [body('singer_pk').isInt({ min: 1, max: 8 })];

export default postSingerVoteValidation;
