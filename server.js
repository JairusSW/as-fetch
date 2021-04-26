const fastify = require('fastify').default

const app = fastify()

const fs = require('fs')

app.listen(3000)

app.get('/get', (req, res) => {

    console.log('GET request')

    res.type('text/plain')

    res.send('Hello, AssemblyScript!')

})

app.post('/post', (req, res) => {

    console.log('POST request')
    
    console.log(req.body)

    res.type('text/plain')

    res.send('Hello, AssemblyScript! POST')

})