import axios from 'axios'

export default function handler(req, res) {
    const { type } = req.query
    let url = 'https://pokeapi.co/api/v2/type/' + type
    axios.get(url)
        .then(function (response) {
            const data = {
                pokemon: response.data.pokemon
                    .map(poke => poke.pokemon.name)
            }
            return res.status(200).send(data)
        })
        .catch(function (error) {
            return res.status(400).send(error)
        })
}