require('dotenv').config();
const cors = require('cors');
const Emitter = require('events');
const limiter = require('express-rate-limit')
const compression = require('compression')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: ["http://127.0.0.1:3000", "http://192.168.1.38:5000"],
        methods: ['GET', 'POST']
    }
})

app.use(limiter({
    windowMs: 1000 * 60 * 10,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
}))

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`)
        }
        else {
            next()
        }
    })
}
app.use(compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
        if (req.xhr || req.headers.accept ? req.headers.accept.indexOf('json') > -1 : "") {
            return false
        }
        return compression.filter(req, res)
    }
}))

app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.1.38:5000"],
    credentials: true
}))


app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET));

const dbConnection = require('./database/connection')
dbConnection();


const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);


const router = require('./router/routes');
const admin_router = require('./router/admin_routes');
const marketing_router = require('./router/marketing_routes.JS');

app.use(router)
app.use(admin_router)
app.use(marketing_router)

const path = require('path')
const staticPath = path.resolve(__dirname, './client/build')
const indexPath = path.resolve(__dirname, './client/build', 'index.html')

app.use(express.static(staticPath))
app.get('*', (req, res) => {
    res.sendFile(indexPath)
})

io.on('connection', (socket) => {

    //join the client in a pvt room
    socket.on('join_into_pvt_room', (order_id) => {
        socket.join(order_id)
    })

    //event emitted from the client
    socket.on('payment_element_mounted', (customerId) => {
        socket.join(customerId)
    })
})

eventEmitter.on('order_updated', (data) => {
    io.to(`order_${data._id}`).emit('user_order_updated', data)
})

eventEmitter.on('order_placed', (customerId) => {
    io.to(customerId).emit('user_order_placed')
    console.log('order placed');
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})