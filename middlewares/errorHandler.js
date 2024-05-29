function errorHandler (err, req, res, next) {
  console.log(err, '<--')
  if(err.name === "UNAUTHORIZED" || err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: "Please login first"
    })
  } else if(err.name === 'FORBIDDEN') {
    res.status(403).json({
      message: "You have no access"
    })
  } else if(err.name === "SequelizeValidationError" || err.name === "SequelizeConstraintUniqueError") {
    console.log(err, '<-- err')
    res.status(400).json({
      message: err.errors[0].message
    })

    res.status(400).json({
      message: ['akdjfalk;dsjf;k']
    })
  } else {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
  
}

module.exports = errorHandler