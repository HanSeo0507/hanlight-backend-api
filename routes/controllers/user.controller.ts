import { Router } from 'express';

// common
import checkValidation from '@Middleware/common/checkValidation';
import passwordEncryption from '@Middleware/user/common/passwordEncryption';

// register
import userExistCheck from '@Middleware/user/common/userExistCheck';
import issueToken from '@Middleware/user/jwt/issueToken';
import signKeyCheck from '@Middleware/user/register/signKeyCheck';

// login
import loginValidation from '@Middleware/user/login/_validation';
import login from '@Middleware/user/login/login';
import registerValidation from '@Middleware/user/register/_validation';
import register from '@Middleware/user/register/register';

// phone
import phoneValidation from '@Middleware/user/phone/_validation';
import fbIssueToken from '@Middleware/user/phone/fbIssueToken';
import phoneCheck from '@Middleware/user/phone/phoneCheck';
import phoneInsert from '@Middleware/user/phone/phoneInsert';

// exist
import existValidation from '@Middleware/user/exist/_validation';
import exist from '@Middleware/user/exist/exist';

const router = Router();

router.use('/register', registerValidation);
router.use('/login', loginValidation);
router.use('/phone', phoneValidation);
router.use('/exist', existValidation);

router.use(checkValidation);

router.post('/register', userExistCheck, signKeyCheck, passwordEncryption, register);
router.post('/login', userExistCheck, passwordEncryption, login, issueToken);
router.post('/phone', signKeyCheck, fbIssueToken, phoneCheck, phoneInsert);
router.get('/exist', exist);

export default router;
