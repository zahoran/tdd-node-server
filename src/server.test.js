import sinon from 'sinon';
import request from 'supertest';
import {expect} from 'chai';
import db from './db';
import {app} from './server';

describe('get /users/:username', () => {
    it('sends the correct response when a user with the username is found', async () => {
        const fakeData = {
            id: '123',
            username: 'abc',
            email: 'abc@gmail.com'
        };
        const stub = sinon
            .stub(db, 'getUserByUsername')
            .resolves(fakeData);

        await request(app).get('/users/abc')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(fakeData);

        expect(stub.getCall(0).args[0]).to.equal('abc');

        stub.restore();
    });

    it('sends 500 when the db is down', async () => {
        const fakeError = {error: 'Something went wrong!'};
        const stub = sinon
            .stub(db, 'getUserByUsername')
            .throws(fakeError);

        await request(app).get('/users/abc')
            .expect(500)
            .expect(fakeError);

        stub.restore();
    });

    it('sends 404 when invalid username is given', async () => {
        const fakeError = {error: 'User not found!'};
        const stub = sinon
            .stub(db, 'getUserByUsername')
            .resolves(null);

        await request(app).get('/users/BBB')
            .expect(404)
            .expect(fakeError);

        stub.restore();
    });
})