
import { Router } from 'express';
import { validateCsrf, validateAuthenticatedSession } from '../middlewares';
import { distanceApi } from '../api/profile/distanceApi/distanceApi';
import { createGrubApi, joinGrubApi, findAllGrubs, findGrubsByLocation } from '../api/profile/grubsApi/grubsApi';

export const profileRoutes = (router: Router) => {
    router.post('/api/profile/distance', validateCsrf, distanceApi);
    router.post('/api/profile/creategrub', validateCsrf, validateAuthenticatedSession, createGrubApi);
    router.post('/api/profile/joingrub', validateCsrf, validateAuthenticatedSession, joinGrubApi);
    router.get('/api/profile/getallgrubs', validateCsrf, validateAuthenticatedSession, findAllGrubs);
    router.get('/api/profile/getgrubsbylocation', validateCsrf, validateAuthenticatedSession, findGrubsByLocation);

    return router;
}