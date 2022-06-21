// end points
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.static('public'))

const {
    getWater,
    deleteWater, 
    createWater, 
    updateWater
} = require('./controller')

app.get('/api/water', getWater)
app.delete(`/api/water/:id`, deleteWater)
app.post(`/api/water`, createWater)
app.put(`/api/water/:id`, updateWater)

app.listen(4000, () => {console.log('On port 4000')})