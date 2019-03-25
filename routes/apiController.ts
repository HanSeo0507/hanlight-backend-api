import { Router } from 'express';

import dev from '@Controller/dev.controller';
import verify from '@Controller/verify.controller';

const router = Router();

router.use('/dev', dev);
router.use('/verify', verify);

export default router;
