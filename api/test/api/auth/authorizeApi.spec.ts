
import { expect } from 'chai';
import { app } from '../../../app';
import * as request from 'supertest';
import { stub } from 'sinon';
import { authorizeService } from '../../../services/authorize/authorizeService';
import * as memcache from 'memory-cache';

describe('Unit Tests: api > auth > authorizeApi', () => {

    let authServiceStub, cacheStub;

    const mockRequest = {
        userName: 'admin',
        userPass: 'U2FsdGVkX18tyGiacGCIGxChZZi1YOQv4G0f50BnyUU=',
        keepMeLoggedIn: false
    }

    beforeEach(() => {
        authServiceStub = stub(authorizeService, 'invoke');
        cacheStub = stub(memcache, 'put');
    });

    afterEach(() => {
        authServiceStub.restore();
        cacheStub.restore();
    });

    it('should return 200, send userId in the response body and set G_SESSION_ID cookie', async () => {
        authServiceStub.callsFake(() => {
            return Promise.resolve({
                userId: 1111111,
                userName: 'user',
                ttl: 1800000,
                sessionId: '1243134-142314-134134'
            });
        });

        const response = await request(app).post('/api/auth/authorize')
                    .send(mockRequest)
                    .set('Origin', 'http://ec2-54-190-46-230.us-west-2.compute.amazonaws.com/api/auth/authorize');
        expect(cacheStub.called).to.equal(true);
        expect(response).to.not.equal(undefined);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({ userId: 1111111 });
        expect(response.headers['set-cookie'][0].indexOf('G_SESSION_ID')).to.not.equal(-1);
    });
})