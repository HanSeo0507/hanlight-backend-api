import { Router } from 'express';

import getCalendarValidation from '@Middleware/calendar/_validation';
import getCalendar from '@Middleware/calendar/getCalendar';
import checkValidation from '@Middleware/common/checkValidation';

const router: Router = Router();

router.get('/', getCalendarValidation);

router.use(checkValidation);

router.get('/', getCalendar);

export default router;
