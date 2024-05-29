const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { Movie, User } = require('../models/')

class Controller {
  static async getMovies (req, res, next) {
    try {
      console.log(req.userId, '<-- Ini di getMovies controller')
      const movies = await Movie.findAl()
      res.json(movies)
    } catch(err) {
      next(err)
    }
  }

  static async addMovie(req, res, next) {
    try {
      const { title, rating } = req.body
      const data = await Movie.create({
        title, rating
      })
      res.status(201).json(data)
    } catch(err) {
      next(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const { id } = req.params

      const movie = await Movie.findByPk(id)
      if(!movie) {
        throw { name: "NOT_FOUND" }
      }

      const deleted = await Movie.destroy({
        where: {
          id
        }
      })

      res.json({
        message: `Movie with title ${movie.title} deleted successfully`
      })
    } catch(err) {
      if(err.name === "NOT_FOUND") {
        res.status(404).json({
          message: "Movie not found"
        })
      } else {
        res.status(500).json({
          message: "Internal Server Error"
        })
      }
    }
  }

  static async register(req, res) {
    try {
      const { email, password } = req.body

      const newUser = await User.create({ email, password })

      res.status(201).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch(err) {
      if(err.name === "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError') {

        const message = err.errors.map(el => el.message)

        res.status(400).json({
          message
        })
      } else {
        res.status(500).json({
          message: "Internal Server Error"
        })
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body
      if(!email || !password) {
        throw { name: "EMAIL_PASSWORD_REQUIRED" }
      }

      // 1. Check emailnya ada di db atau tidak?
      const foundUser = await User.findOne({
        where: {
          email
        }
      })

      if(!foundUser) {
        throw { name: "UNAUTHORIZED" }
      }

      // 2. Check password, valid atau tidak?
      const compared = comparePassword(password, foundUser.password)

      if(!compared) {
        throw { name: "UNAUTHORIZED" }
      }

      // 3. Generate token

      const access_token = signToken({
        id: foundUser.id
      })

      res.status(200).json({
        access_token
      })

    } catch(err) {
      if(err.name === "EMAIL_PASSWORD_REQUIRED") {
        res.status(400).json({
          message: "Email and password is required"
        })
      } else if(err.name === "UNAUTHORIZED") {
        res.status(401).json({
          message: "Email or password is not valid"
        })
      } else {
        res.status(500).json({
          message: "Internal Server Error"
        })
      }
    }
  }
}

module.exports = Controller
