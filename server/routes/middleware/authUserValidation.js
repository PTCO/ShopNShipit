module.exports = async (req, res, next) => {
    try {
        const db = require('../../db');
        const throwError  = require('../helperFunctions/throwError');
        const { UserSessions } = db.models
        const cookie = await UserSessions.findOne({ where: { sid: req.params.sid}});
        if(!cookie) throwError('User has been logged out', 403);
        next();
    } catch (error) {
        next(error);
    }
}