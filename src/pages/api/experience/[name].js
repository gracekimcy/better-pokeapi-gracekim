import axios from 'axios'

export default function handler(req, res) {
    const { name } = req.query
    const level = parseInt(req.query.level)

    let speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + name
    axios.get(speciesUrl)
        .then(function (response) {
            const growthRateUrl = response.data.growth_rate.url
            axios.get(growthRateUrl)
                .then(function (response) {
                    const levels = response.data.levels
                    const exp = levels[level - 1].experience
                    const data = {
                        experience: exp
                    }
                    return res.status(200).send(data)
                })
                .catch(function (error) {
                    return res.status(400).send(error)
                })
        })
        .catch(function (error) {
            return res.status(400).send(error)
        })
}