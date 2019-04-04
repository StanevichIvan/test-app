const request = require('supertest');
const app = require('../app');

describe('Authenticate', () => {

    const userCredentials = {
        name: 'user112131',
        password: '123456'
    };

    it('should return auth token', done => {
        request(app)
            .post('/user')
            .send(userCredentials)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => {

                request(app)
                    .post('/authenticate')
                    .set('Accept', 'application/json')
                    .send(userCredentials)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });
    });

    it('should throw error on wrong user or password', done => {
        request(app)
            .post('/authenticate')
            .set('Accept', 'application/json')
            .send({
                name: 'wrong_name',
                password: 'wrong_password'
            })
            .expect('Content-Type', /json/)
            .expect(403)
            .end(done);
    });
});
