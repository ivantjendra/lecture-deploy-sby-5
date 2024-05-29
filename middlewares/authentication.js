const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models/')

const authentication = async (req, res, next) => {
  try {
    // 1. Cek dulu ada tokennya atau tidak?
    if(!req.headers.authorization) {
      throw { name: "UNAUTHORIZED" }
    }

    // 2. Split headers authorization karena menggunakan Bearer token
    const token = req.headers.authorization.split(' ')[1]

    // 3. Verify tokennya
    const payload = verifyToken(token)
    console.log(payload, '<---')
    // 4. Check user berdasarkan data dari payload
    const user = await User.findByPk(payload.id)

    if(!user) {
      throw { name: "UNAUTHORIZED" }
    }

    req.user = {
      id: user.id,
      role: "Staff"
    }

    // req.userId = user.id
    // req.role = user.role
    next()

  } catch(err) {
    console.log(err, '<-- di authentication')
    next(err)
  }
}

module.exports = authentication