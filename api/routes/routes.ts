
import { Router } from 'express';
import { healthCheck } from '../api/healthCheckApi/healthCheckApi';
import { authRoutes } from './authRoutes';

export const apiRoutes = (router: Router) => {
    router.all('/healthcheck', healthCheck);
    authRoutes(router);
    return router;
};