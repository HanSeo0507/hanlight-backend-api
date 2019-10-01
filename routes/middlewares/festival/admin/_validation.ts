import { body, ValidationChain } from 'express-validator';

export interface Body {
  user_pk: string;
}

const FSUserCheckValidation: ValidationChain[] = [body('user_pk').isUUID()];

export default FSUserCheckValidation;
