import { Router } from 'express';

import getFSTimeTable from '@Middleware/festival/timetable/getFSTimeTable';

const router: Router = Router();

router.get('/', getFSTimeTable);

export default router;
