let celebrities = []
let id = 1

getCelebrity = (req, res) => {
    res.status(200).send(celebrities)
}

addCelebrity = (req, res) => {
    const {name, age, netWorth} = req.body;
    celebrities.push({id, name, age, netWorth})
    id++
    res.sendStatus(200)
}

module.exports = {
    getCelebrity,
    addCelebrity
}