import { body, ValidationChain } from 'express-validator';

export interface Body {
  team_pk: number;
}

const postLOLVoteValidation: ValidationChain[] = [body('team_pk').isInt({ min: 1, max: 2 })];

export default postLOLVoteValidation;
