const facts = require('./facts.json')

const express = require('express')
const app = express()

app.use(express.static('public'));

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Cheese Pizza!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    res.send(`hey, ${req.query.name}`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    res.send(`${req.params.num1}`)
    res.send(JSON.stringify({message: "Hey Dude"}))
})

app.get('/pandorasbox', (req, res)=> {

    // do the work

    fetch("https://icanhazdadjoke.com/", { 
        headers: {
            "Accept": "application/json"
        }
        })
        .then( res => res.json() )
        .then( (data) => {
            console.log(data)
            res.render('pandorasbox', {title: "Pandora's Box", message: data.joke} )
        })

    //const message = "DAD JOKE"
    // const length = facts.length;
    // const random =  Math.floor( Math.random() * length)
    // const fact4 = facts[random].fact

    // res.render('pandorasbox', {title: "Pandora's Box", message:fact4} )

})