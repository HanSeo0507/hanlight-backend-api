import { Router } from 'express';

// common
import checkValidation from '@Middleware/common/checkValidation';
import passwordEncryption from '@Middleware/verify/common/passwordEncryption';
// register
import userExistCheck from '@Middleware/verify/common/userExistCheck';
import issueToken from '@Middleware/verify/jwt/issueToken';
// login
import loginValidation from '@Middleware/verify/login/_validation';
import login from '@Middleware/verify/login/login';
import registerValidation from '@Middleware/verify/register/_validation';
import register from '@Middleware/verify/register/register';
import signKeyCheck from '@Middleware/verify/register/signKeyCheck';

const router = Router();

router.post('/register', registerValidation);
router.post('/login', loginValidation);

router.use(checkValidation);

router.post('/register', userExistCheck, signKeyCheck, passwordEncryption, register);
router.post('/login', userExistCheck, passwordEncryption, login, issueToken);

export default router;
