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
            .end((data) => {
                console.log(data);
                request(app)
                    .post('/authenticate')
                    .set('Accept', 'application/json')
                    .send(userCredentials)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });
    });
});
