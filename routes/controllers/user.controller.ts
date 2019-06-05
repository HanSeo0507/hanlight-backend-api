import { Router } from 'express';

// common
import checkValidation from '@Middleware/common/checkValidation';
import passwordEncryption from '@Middleware/user/common/passwordEncryption';

// register
import userExistCheck from '@Middleware/user/common/userExistCheck';
import signKeyCheck from '@Middleware/user/register/signKeyCheck';

// login
import loginValidation from '@Middleware/user/login/_validation';
import login from '@Middleware/user/login/login';
import registerValidation from '@Middleware/user/register/_validation';
import register from '@Middleware/user/register/register';

// phone
import phoneValidation from '@Middleware/user/phone/_validation';
import fbCheckCode from '@Middleware/user/phone/fbCheckCode';
import phoneCheck from '@Middleware/user/phone/phoneCheck';
import phoneInsert from '@Middleware/user/phone/phoneInsert';

// exist
import existValidation from '@Middleware/user/exist/_validation';
import exist from '@Middleware/user/exist/exist';

// recovery
import recoveryIdValidation from '@Middleware/user/recovery/id/_validation';
import recoveryId from '@Middleware/user/recovery/id/recoveryId';
import recoveryPwValidation from '@Middleware/user/recovery/password/_validation';

// jwt
import getUserFromToken from '@Middleware/user/jwt/getUserFromToken';
import issueToken from '@Middleware/user/jwt/issueToken';
import verifyToken from '@Middleware/user/jwt/veirfyToken';

// get
import getUser from '@Middleware/user/get/getUser';

// patch
import userPatchPassword from '@Middleware/user/patch/password/_validation';
import patchPassword from '@Middleware/user/patch/password/patchPassword';

const router = Router();

router.use('/register', registerValidation);
router.use('/login', loginValidation);
router.use('/phone', phoneValidation);
router.use('/exist', existValidation);
router.use('/recovery/id', recoveryIdValidation);
router.use('/recovery/password', recoveryPwValidation);
router.patch('/password', userPatchPassword);

router.use(checkValidation);

router.post('/register', userExistCheck, signKeyCheck, passwordEncryption, register);
router.post('/login', userExistCheck, passwordEncryption, login, issueToken('login'));
router.post('/phone', signKeyCheck, fbCheckCode, phoneCheck, phoneInsert);
router.get('/exist', exist);
router.post('/recovery/id', fbCheckCode, recoveryId);
router.post('/recovery/password', fbCheckCode, phoneCheck, issueToken('none'));

router.get('/', verifyToken, getUserFromToken, getUser);
router.patch('/password', verifyToken, getUserFromToken, passwordEncryption, patchPassword);

export default router;
