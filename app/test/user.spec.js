const request = require('supertest');
const app = require('../app');

describe('/user', function () {

    const authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJpZCI6MSwidGltZSI6IjIwMTktMDQtMDNUMTQ6NTA6MTAuMDg5WiIsImlhdCI6MTU1NDMwMzAxMCwiZXhwIjoxNTU0Mzk5MDEwfQ.3btGIGxtSAm1B7mwFoo9Q5xWx5p1TnKcOOfDYEyKAqE';
    let userId = 1;

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
        it('should update user ', done  => {
            let userId;

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
});
