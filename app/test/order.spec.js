const request = require('supertest');
const app = require('../app');

describe('Order', () => {

    let authToken;
    let orderId;

    beforeEach(done => {
        const userData = {
            name: 'user',
            password: 'password'
        };

        request(app)
            .post('/users')
            .send(userData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => {
                request(app)
                    .post('/authenticate')
                    .set('Accept', 'application/json')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        authToken = res.body.token;
                        done();
                    });
            });
    });

    describe('POST', () => {
        it('should create order', done => {
            request(app)
                .post('/orders')
                .send({
                    title: 'user\'s order'
                })
                .set('Accept', 'application/json')
                .set('token', authToken)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body.id) {
                        orderId = res.body.id;
                    }
                    done();
                });
        });
    });


    describe('GET', () => {
        it('should return order by id', done => {
            request(app)
                .get(`/orders/${orderId}`)
                .set('Accept', 'application/json')
                .set('token', authToken)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });
    });

    describe('DELETE', () => {
        it('should delete order by id', done => {
            request(app)
                .delete(`/orders/${orderId}`)
                .set('Accept', 'application/json')
                .set('token', authToken)
                .expect(200)
                .end(done);
        });
    });
});
