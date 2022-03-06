import { io } from 'socket.io-client'

const initializeSocket = () => {
    return io(process.env.REACT_APP_SERVER_ADDRESS, {
        'force new connection': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket']
    })
}

export default initializeSocket;
