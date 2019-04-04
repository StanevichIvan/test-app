module.exports = {
    env: 'test',
    port: process.env.port || 3000,
    jwtSecret: 'secret',
    host: 'db',
    db_port: 5432
};
