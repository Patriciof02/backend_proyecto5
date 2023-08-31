const crypto = require ('crypto')
const salt = process.env.SALT

const hashPassword =(pass) =>{
    return crypto.pbkdf2Sync(pass, salt, 10000, 512, 'sha512').toString('hex')
}

module.exports = hashPassword