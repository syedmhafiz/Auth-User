const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const { hash } = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
    
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send("No matched User")
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Done")
        } else {
            res.send("No Access!")
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)