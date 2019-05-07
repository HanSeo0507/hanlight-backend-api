import { Router } from 'express';

import dev from '@Controller/dev.controller';
import user from '@Controller/user.controller';

const router = Router();

router.use('/dev', dev);
router.use('/user', user);

export default router;
