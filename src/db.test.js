import {expect} from 'chai';
import {getUserByUsername} from './db.js';
import {getDatabaseData, resetDatabase, setDatabaseData} from "./test-helpers";

describe('getUserByUsername', () => {

    beforeEach('set up the database', async () => {
        const fakeData = [{
            id: '123',
            username: 'abc',
            email: 'abc@gmail.com'
        }, {
            id: '124',
            username: 'wrong',
            email: 'wrong@wrong.com'
        }];

        await setDatabaseData('users', fakeData);
    });

    afterEach('reset the database', async () => {
        await resetDatabase();
    });

    it('get the correct user from the database given the username', async () => {
        const actual = await getUserByUsername('abc');

        const expected = {
            id: '123',
            username: 'abc',
            email: 'abc@gmail.com'
        };
        expect(actual).excludingEvery('_id').to.deep.equal(expected);
    });

    it('gets nothing when the username is not exist', async () => {
        const actual = await getUserByUsername('DDD');

        expect(actual).to.be.null;
    });
});