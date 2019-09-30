import { Router } from 'express';

import checkValidation from '@Middleware/common/checkValidation';
import FSUserCheckValidation from '@Middleware/festival/admin/_validation';

import FSUserCheck from '@Middleware/festival/admin/FSUserCheck';

const router: Router = Router();

router.post('/user-check', FSUserCheckValidation);

router.use(checkValidation);

router.post('/user-check', FSUserCheck);

export default router;
