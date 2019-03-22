import { Router } from 'express';

import dev from '@Controller/dev.controller';

const router = Router();

router.use('/dev', dev);

export default router;
