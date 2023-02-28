import axios from 'axios'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export default function handler(req, res) {
    const { pokemon } = req.body;

    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon

    axios.get(url)
        .then(function (response) {
            let N = getRandomInt(1, 256)
            let BALL = getRandomInt(1, 256)
            let HPm = response.data.stats[0].base_stat
            let HPc = getRandomInt(1, HPm + 1)
            let f = (HPm * 255 * 4) / (HPc * BALL)

            const data = {
                caught: f >= N ? true : false
            }
            return res.status(200).send(data)
        })
        .catch(function (error) {
            return res.status(400).send(error)
        })
}