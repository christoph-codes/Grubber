
import { Router } from 'express';
import { authorizeApi } from '../api/auth/authorizeApi/authorizeApi';

export const authRoutes = (router: Router) => {
    router.post('/api/auth/authorize', authorizeApi);

    return router;
}