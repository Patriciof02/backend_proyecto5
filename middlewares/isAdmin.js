const isAdmin = (req, res, next) => {
    if (req.user && req.user.admin === 'true') {
        return next(); // Si es administrador, continúa con la siguiente función
    }
    return res.status(403).json({ message: 'Access denied' }); // Si no es administrador, denegar acceso
};

module.exports = isAdmin