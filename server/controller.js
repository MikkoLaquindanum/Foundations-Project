const water = require('./db.json')
let globalId = 11

module.exports = {
    getWater: (req, res) => res.status(200).send(water),
    deleteWater: (req, res) => {
        let index = water.findIndex(elem => elem.id === +req.params.id)
        water.splice(index, 1)
        res.status(200).send(water)
    },
    createWater: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newWater = {
            id: globalId,
            title, 
            rating,
            imageURL
        }
        water.push(newWater)
        res.status(200).send(Water)
        globalId++
    },
    updateWater: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = water.findIndex(elem => +elem.id === +id)

        if (water[index].rating === 5 && type === 'plus') {
            res.status(400).send('no')
        } else if (water[index].rating === 0 && type === 'minus') {
            res.status(400).send('no')
        } else if (type === 'plus') {
            water[index].rating++
            res.status(200).send(water)
        } else if (type === 'minus') {
            water[index].rating--
            res.status(200).send(water)
        } else {
            res.sendStatus(400)
        }
    }
}