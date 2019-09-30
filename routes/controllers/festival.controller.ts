import { Router } from 'express';

import admin from './festival/admin.controller';
import event from './festival/event.controller';
import lol from './festival/lol.controller';
import timetable from './festival/timetable.controller';

const router: Router = Router();

router.use('/lol', lol);
router.use('/event', event);
router.use('/timetable', timetable);
router.use('/admin', admin);

export default router;
