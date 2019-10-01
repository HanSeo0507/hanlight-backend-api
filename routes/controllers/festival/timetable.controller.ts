import { Router } from 'express';

import getFSTimeTable from '@Middleware/festival/timetable/getfsTimeTable';

const router: Router = Router();

router.get('/', getFSTimeTable);

export default router;
