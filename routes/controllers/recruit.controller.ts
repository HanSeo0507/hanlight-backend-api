import { Router } from 'express';

// validation
import postRecruitValidation from '@Middleware/recruit/post/_validation';

// common
import checkValidation from '@Middleware/common/checkValidation';

// post
import postRecruit from '@Middleware/recruit/post/postRecruit';

const router: Router = Router();

router.post('/', postRecruitValidation);

router.use(checkValidation);

router.post('/', postRecruit);

export default router;
