import axios from 'axios'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export default function handler(req, res) {
    let randNum = getRandomInt(1, 1009)
    let url = 'https://pokeapi.co/api/v2/pokemon/' + randNum
    axios.get(url)
        .then(function (response) {
            const data = {
                pokemonName: response.data.name,
                sprite: response.data.sprites.front_default,
                types: response.data.types
                    .map(type => type.type.name)
            }
            return res.status(200).send(data)
        })
        .catch(function (error) {
            return res.status(400).send(error)
        })
}