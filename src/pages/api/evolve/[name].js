import axios from 'axios'

export default function handler(req, res) {
    const { name } = req.query
    //Fetch Pokemon species data
    let speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + name
    axios.get(speciesUrl)
        .then(function (response) {
            //Fetch Pokemon evolution chain data
            let evolutionChainUrl = response.data.evolution_chain.url
            axios.get(evolutionChainUrl)
                .then(function (response) {
                    let chain = response.data.chain

                    let next = []
                    function getNext(data, prev) {
                        if (prev == name) {
                            next.push(data.species.name)
                        } else {
                            let curr = data.species.name

                            for (let i = 0; i < data.evolves_to.length; i++) {
                                getNext(data.evolves_to[i], curr)
                            }
                        }
                    }
                    getNext(chain, null)
                    if (next.length == 0) {
                        next.push(name)
                    }

                    const data = {
                        name: response.data.name,
                        evolution: next.join(', ')
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