import { Router } from 'express';

// validation
import postRecruitAnswerValidation from '@Middleware/recruit/answer/post/_validation';
import getRecruitValidation from '@Middleware/recruit/get/_validation';
import postRecruitValidation from '@Middleware/recruit/post/_validation';

// common
import checkValidation from '@Middleware/common/checkValidation';

// get
import getRecruit from '@Middleware/recruit/get/getRecruit';

// post
import postRecruitAnswer from '@Middleware/recruit/answer/post/postRecruitAnswer';
import postRecruit from '@Middleware/recruit/post/postRecruit';

const router: Router = Router();

router.get('/', getRecruitValidation);
router.post('/', postRecruitValidation);
router.post('/answer', postRecruitAnswerValidation);

router.use(checkValidation);

router.get('/', getRecruit);
router.post('/', postRecruit);
router.post('/answer', postRecruitAnswer);

export default router;
