import axios from 'axios'

export default function handler(req, res) {
    const { pokemon1 } = req.body;
    const { pokemon2 } = req.body;

    let url1 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon1
    let url2 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon2

    axios.get(url1)
        .then(function (response) {
            let max1 = -1
            let baseStats1 = response.data.stats
                .map(stat => stat.base_stat)
            for (let i = 0; i < baseStats1.length; i++) {
                if (max1 < baseStats1[i]) {
                    max1 = baseStats1[i]
                }
            }

            axios.get(url2)
                .then(function (response) {
                    let max2 = -1
                    let baseStats2 = response.data.stats
                        .map(stat => stat.base_stat)
                    for (let i = 0; i < baseStats2.length; i++) {
                        if (max2 < baseStats2[i]) {
                            max2 = baseStats2[i]
                        }
                    }

                    let result
                    if (max1 > max2) {
                        result = pokemon1
                    } else if (max1 < max2) {
                        result = pokemon2
                    } else {
                        result = 'tied'
                    }

                    const data = {
                        winner: result
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