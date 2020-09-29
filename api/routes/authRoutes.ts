
import { Router } from 'express';
import { validateCsrf } from '../middlewares';
import { authorizeApi } from '../api/auth/authorizeApi/authorizeApi';
import { createAccountApi } from '../api/auth/createAccountApi/createAccountApi';

export const authRoutes = (router: Router) => {
    router.post('/api/auth/authorize', validateCsrf, authorizeApi);
    router.post('/api/auth/createaccount', validateCsrf, createAccountApi);

    return router;
}