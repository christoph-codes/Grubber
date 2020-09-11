
import { Router } from 'express';
import { healthCheck } from '../api/healthCheckApi/healthCheckApi';

export const apiRoutes = (router: Router) => {
    router.all('/healthcheck', healthCheck);
    return router;
};