const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const privateKey = fs.readFileSync(__dirname + '/cert/selfsigned.key', 'utf8')
const certificate = fs.readFileSync(__dirname + '/cert/selfsigned.crt', 'utf8')
const port = process.env.PORT || 55555
const path = require('path')

var credentials = {key: privateKey, cert: certificate}

// just to test the server
app.use(express.static(path.join(__dirname + '/public')))
server = https.createServer(credentials, app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('chat', message => {
        io.emit('chat', message)
    })
})

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
