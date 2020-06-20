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

export { getToken, connectToMongoDB }
