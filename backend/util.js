import jwt from 'jsonwebtoken'
import config from './config'
import mongoose from 'mongoose'

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  )
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    const onlyToken = token.slice(7, token.length)
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: 'Invalid Token' })
      }
      req.user = token
      next()
      return
    })
  }
  return res.status(401).send({
    msg: 'Token is not supplied',
  })
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  return res.status(401).send({ msg: 'Admin Token is not valid' })
}

const mongodbUrl = config.MONGODB_URL

const checkDBConnection = () => {
  const db = mongoose.connection
  db.once('open', (_) => {
    console.log('Database connected:', mongodbUrl)
  })

  db.on('error', (err) => {
    console.error('connection error:', err)
  })
}

const connectToMongoDB = () => {
  mongoose
    .connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log('error: ', error.reason))
  mongoose.set('useCreateIndex', true)
  checkDBConnection()
}

export { getToken, connectToMongoDB, isAuth, isAdmin }
