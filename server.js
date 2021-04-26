const fastify = require('fastify').default

const app = fastify()

const fs = require('fs')

app.listen(3000)

app.get('/', (req, res) => {

    console.log('GET request')

    res.type('application/json')

    res.send({
        ip: '127.0.0.1',
        location: 'Poulsbo, WA',
        lat: -12.2310421,
        lon: 5.12030123,
        zip: 98370
    })

})


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