
import { Router } from 'express';
import { validateCsrf } from '../middlewares';
import { distanceApi } from '../api/profile/distanceApi/distanceApi';

export const profileRoutes = (router: Router) => {
    router.post('/api/profile/distance', validateCsrf, distanceApi);

    return router;
}