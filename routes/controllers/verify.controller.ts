import { Router } from 'express';

// common
import checkValidation from '@Middleware/common/checkValidation';
import passwordEncryption from '@Middleware/verify/common/passwordEncryption';

// register
import userExistCheck from '@Middleware/verify/common/userExistCheck';
import issueToken from '@Middleware/verify/jwt/issueToken';
import signKeyCheck from '@Middleware/verify/register/signKeyCheck';

// login
import loginValidation from '@Middleware/verify/login/_validation';
import login from '@Middleware/verify/login/login';
import registerValidation from '@Middleware/verify/register/_validation';
import register from '@Middleware/verify/register/register';

// phone
import phoneValidation from '@Middleware/verify/phone/_validation';
import fbIssueToken from '@Middleware/verify/phone/fbIssueToken';
import phoneCheck from '@Middleware/verify/phone/phoneCheck';
import phoneInsert from '@Middleware/verify/phone/phoneInsert';
import stateValidation from '@Middleware/verify/phone/state/_validation';
import stateReturn from '@Middleware/verify/phone/state/stateReturn';
import stateCheck from '@Middleware/verify/phone/stateCheck';

const router = Router();

router.post('/register', registerValidation);
router.post('/login', loginValidation);
router.post('/phone', phoneValidation);
router.post('/phone/state', stateValidation);

router.use(checkValidation);

router.post('/register', userExistCheck, signKeyCheck, passwordEncryption, register);
router.post('/login', userExistCheck, passwordEncryption, login, issueToken);
router.post('/phone', signKeyCheck, stateCheck, fbIssueToken, phoneCheck, phoneInsert);
router.post('/phone/state', signKeyCheck, stateReturn);

export default router;
