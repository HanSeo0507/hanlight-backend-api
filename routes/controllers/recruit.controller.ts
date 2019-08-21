import { Router } from 'express';

// validation
import getAnswerValidation from '@Middleware/recruit/answer/get/_validation';
import postAnswerValidation from '@Middleware/recruit/answer/post/_validation';
import getRecruitValidation from '@Middleware/recruit/get/_validation';
import postRecruitValidation from '@Middleware/recruit/post/_validation';

// common
import checkValidation from '@Middleware/common/checkValidation';

// get
import getAnswer from '@Middleware/recruit/answer/get/getAnswer';
import getRecruit from '@Middleware/recruit/get/getRecruit';

// post
import postAnswer from '@Middleware/recruit/answer/post/postAnswer';
import postRecruit from '@Middleware/recruit/post/postRecruit';

// delete
import deleteRecruitValidation from '@Middleware/recruit/delete/_validation';
import deleteRecruit from '@Middleware/recruit/delete/deleteRecruit';

const router: Router = Router();

router.get('/', getRecruitValidation);
router.post('/', postRecruitValidation);
router.get('/answer', getAnswerValidation);
router.post('/answer', postAnswerValidation);
router.delete('/', deleteRecruitValidation);

router.use(checkValidation);

router.get('/', getRecruit);
router.post('/', postRecruit);
router.get('/answer', getAnswer);
router.post('/answer', postAnswer);
router.delete('/', deleteRecruit);

export default router;
