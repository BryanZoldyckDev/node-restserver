const { response } = require("express")


const isAdmin = (req, res = response, next) => {
    
    if (!req.user) {
        return res.status(500).json({
            msg: 'Role is trying to be validate, without validated the token'
        })
    }

    const {role, name} = req.user;

    if(role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an administrator - You can't do this`
        })
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Role is trying to be validate, without validated the token'
            })
        }

        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service needs one of this roles: ${roles}`
            })
        }


        next();
    }
}

module.exports = {
    isAdmin,
    hasRole
}