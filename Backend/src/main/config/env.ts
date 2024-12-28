require('dotenv').config({ path: require('find-config')('.env') })
export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/plataforma-de-jogos',
  port: process.env.PORT || 5050,
  mailHost: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  mailPort: process.env.MAIL_PORT || 2525,
  mailUser: process.env.MAIL_USER || 'df4b4f084212cb',
  mailPass: process.env.MAIL_PASS || '1c2041a7829325',
  jwtSecret: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1MDg1M2IxMDYzZDQxOWFjMmViZWIzIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNzMzNDA5NTE1fQ.DD4SsQslXrD5VbkqNZObXE8JpOC7cQAaZZjwW87Z2KI',
}
