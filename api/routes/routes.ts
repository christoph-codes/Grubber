
import { Router } from 'express';
import { healthCheck } from '../api/healthCheckApi/healthCheckApi';
import { authRoutes } from './authRoutes';
import { profileRoutes } from './profileRoutes';

export const apiRoutes = (router: Router) => {
    router.all('/healthcheck', healthCheck);
    authRoutes(router);
    profileRoutes(router);
    return router;
};