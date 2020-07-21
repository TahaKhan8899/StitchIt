import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/stitchit',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  STRIPE_SECRET:
    process.env.STRIPE_SECRET ||
    'sk_test_51H5E3pAnfC00bDgzz40wRn9vYGmVsshZ50IoxXQyjKHXUV2iqgW7jxJ8YLzbg8an22wmI2hmiwoWZRqH6vsON6RA006gl7sPgb',
}
