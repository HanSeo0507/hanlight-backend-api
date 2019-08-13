import { body, ValidationChain } from 'express-validator/check';

const postRecruitAnswerValidation: ValidationChain[] = [
  body('recruit_pk').isInt(),
  body('answers')
    .isArray()
    .custom(
      (answers: any[]) =>
        answers.length > 0 &&
        answers.every(
          (answer: any) => typeof answer.question_pk === 'number' && typeof answer.answer === 'string' && answer.answer.length <= 300
        )
    ),
];

export default postRecruitAnswerValidation;
