module.exports = {
    env: 'development',
    port: process.env.port || 3000,
    jwtSecret: 'secret',
    host: 'db',
    db_port: 5432
};
