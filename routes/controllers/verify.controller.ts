import { Router } from 'express';

import checkValidation from '@Middleware/common/checkValidation';
import passwordEncryption from '@Middleware/verify/common/passwordEncryption';
import userExistCheck from '@Middleware/verify/common/userExistCheck';
import registerValidation from '@Middleware/verify/register/_validation';
import register from '@Middleware/verify/register/register';
import signKeyCheck from '@Middleware/verify/register/signKeyCheck';

const router = Router();

router.post('/register', registerValidation, checkValidation, userExistCheck, signKeyCheck, passwordEncryption, register);

export default router;
