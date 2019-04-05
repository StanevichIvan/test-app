const request = require('supertest');
const app = require('../app');

describe('/user', function () {

    let authKey;
    let userId = 1;

    beforeEach(done => {
        const userData = {
            name: 'user',
            password: 'password'
        };

        request(app)
            .post('/user')
            .send(userData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {

                if (res.body.user.id) {
                    userId = res.body.user.id;
                }

                request(app)
                    .post('/authenticate')
                    .set('Accept', 'application/json')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        authKey = res.body.token;
                        done();
                    });
            });
    });


    describe('GET', () => {
        it('should respond with json containing a list of all users', done => {
            request(app)
                .get('/user')
                .set('Accept', 'application/json')
                .set('token', authKey)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });

        it('should return error if auth token doesn\'t exists', done => {
            request(app)
                .get('/user')
                .set('Accept', 'application/json')
                .expect(403)
                .end(done);
        });
    });

    describe('POST', () => {
        it('should create new user', done => {
            request(app)
                .post('/user')
                .send({
                    name: 'User1',
                    password: '1324ee'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body.user.id) {
                        userId = res.body.user.id;
                    }

                    done();
                });
        });
    });

    describe('DELETE', () => {
        it('should delete user by id', done => {
            request(app)
                .delete(`/user/${userId}`)
                .set('Accept', 'application/json')
                .set('token', authKey)
                .expect(200)
                .end(done);
        });

        it('should return err if user with id is not found', done => {
            request(app)
                .delete(`/user/1231234c`)
                .set('Accept', 'application/json')
                .set('token', authKey)
                .expect(404)
                .end(done);
        });
    });

    describe('UPDATE', () => {
        let authKey;
        let userId;

        beforeEach(done => {
            const userData = {
                name: 'user',
                password: 'password'
            };

            request(app)
                .post('/user')
                .send(userData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    userId = res.body.user.id;

                    request(app)
                        .post('/authenticate')
                        .set('Accept', 'application/json')
                        .send(userData)
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end((err, res) => {
                            authKey = res.body.token;
                            done();
                        });
                });
        });

        it('should update user ', done => {
            request(app)
                .put(`/user/${userId}`)
                .send({
                    name: 'new name',
                    password: 'new_password'
                })
                .set('Accept', 'application/json')
                .set('token', authKey)
                .expect(200)
                .end(done);

        });
    });
});
