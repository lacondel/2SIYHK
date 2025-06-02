const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h',
    algorithm: 'HS256'
};

module.exports = jwtConfig; 