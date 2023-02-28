import axios from 'axios'

export default function handler(req, res) {
    const { name } = req.query
    let url = 'https://pokeapi.co/api/v2/pokemon/' + name
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