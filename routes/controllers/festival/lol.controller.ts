import { Router } from 'express';

import checkValidation from '@Middleware/common/checkValidation';

import postLOLVoteValidation from '@Middleware/festival/lol/post/_validation';

import getLOLTeam from '@Middleware/festival/lol/get/getLOLTeam';
import postLOLVote from '@Middleware/festival/lol/post/postLOLVote';

const router: Router = Router();

router.post('/vote', postLOLVoteValidation);

router.use(checkValidation);

router.get('/team', getLOLTeam);
router.post('/vote', postLOLVote);

export default router;
