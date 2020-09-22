
import { Router } from 'express';
import { validateCsrf } from '../middlewares';
import { authorizeApi } from '../api/auth/authorizeApi/authorizeApi';

export const authRoutes = (router: Router) => {
    router.post('/api/auth/authorize', validateCsrf, authorizeApi);

    return router;
}