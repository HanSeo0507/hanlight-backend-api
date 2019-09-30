import { Router } from 'express';

import checkValidation from '@Middleware/common/checkValidation';

import postSingerVoteValidation from '@Middleware/festival/singer/post/_validation';

import checkUserType from '@Middleware/common/checkUserType';

import getMatch from '@Middleware/festival/match/get/getMatch';
import getSinger from '@Middleware/festival/singer/get/getSinger';
import postSingerVote from '@Middleware/festival/singer/post/postSingerVote';

const router: Router = Router();

router.post('/singer/vote', postSingerVoteValidation);

router.use(checkValidation);

router.get('/match', checkUserType('student'), getMatch);
router.get('/singer', getSinger);
router.post('/singer/vote', postSingerVote);

export default router;
