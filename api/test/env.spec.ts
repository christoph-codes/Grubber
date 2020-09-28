
import { expect } from 'chai';
import { stub } from 'sinon';
import * as nconf from 'nconf';
import { getEnv, load } from '../env';

describe('Unit Tests: env', () => {

    let nconfStub;
    let processStub;

    beforeEach(() => {
        nconfStub = stub(nconf, 'get');
        processStub = stub(process, 'exit');
    });

    afterEach(() => {
        nconfStub.restore();
        processStub.restore();
    })

    it('should return the server environment', () => {
        nconfStub.callsFake(() => {
            return 'DEV';
        });
        expect(getEnv()).to.equal('DEV');
    });

    it('load should complete if environment is set', () => {
        nconfStub.callsFake(() => {
            return 'DEV';
        });
        expect(load()).to.not.equal(undefined);
    });

    it('process should exit if environment is not set', () => {
        nconfStub.callsFake(() => {
            return undefined;
        });
        load();
        expect(processStub.called).to.equal(true);
    });
});