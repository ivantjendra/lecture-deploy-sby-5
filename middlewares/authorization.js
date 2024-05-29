const authorization = async (req, res, next) => {
  try {

    if (req.user.role === 'Admin') {
      next()
    } else {
      throw { name: "FORBIDDEN" }
    }
  } catch(err) {
    next(err)
  }
}

module.exports = authorization