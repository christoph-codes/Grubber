
import { expect } from 'chai';
import { app } from '../../app';
import * as request from 'supertest';

describe('Unit Tests: api > healthCheckApi', () => {
    it('healthcheck api should return 200', async () => {
        const response = await request(app).get('/healthcheck');
        expect(response).to.not.equal(undefined);
        expect(response.status).to.equal(200);
        expect(response.body).to.not.equal(undefined);
    });
});
