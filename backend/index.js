const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: process.env.FRONT_ORIGIN, // 허용할 도메인
    credentials: true                 // 인증정보(쿠키 등) 포함 여부
}));


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch((err) => console.log('연결 실패', err))


const todoRoutes = require('./routes/todoRoutes')
app.use('/api/todos', todoRoutes)

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.listen(PORT, () => {
    console.log('Server is Running!')
})

