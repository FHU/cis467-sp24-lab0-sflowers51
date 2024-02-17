const { title } = require('process');
const facts = require('./facts.json')

const express = require('express');
const { isStringObject } = require('util/types');
const { isString } = require('util');
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

app.get('/greet', (req, res) => {
    const { name, dob } = req.query;

    

    const currentYear = new Date().getFullYear();
    const age1 = currentYear - parseInt(dob);
    const age2 = age1 - 1;

    if (!name || !dob || isNaN(age1) || isNaN(age2) ) {
        res.render('greet', {title:'hey :(', message: "Please provide both 'name' and 'year' parameters."});
    }

    else{
    const greeting = `Hello, ${name}!\nYou are ${age1} or ${age2} years old.`;

    res.render('greet', {title:'Greetings!' ,message: greeting});
    }
});

app.get('/math/:num1/:op/:num2', (req, res) => {
    const { num1, op, num2 } = req.params;

    let result;
    let title;

    switch (op) {
        case 'times':
            result = num1 * num2;
            title = 'Answer '
            break;
        case 'divideby':
            result = num1 / num2;
            title = 'Answer '
            break;
        case 'plus':
            result = parseFloat(num1) + parseFloat(num2);
            title = 'Answer '
            break;
        case 'minus':
            result = parseFloat(num1) - parseFloat(num2);
            title = 'Answer '
            break;
        case 'tothepowerof':
            result = Math.pow(num1, num2);
            title = 'Answer '
            break;
        default:
            result = "Invalid operation";
            title = "Error";
            return;
    }

    if (isNaN(result)){
        result = "Inputs Must Be Numbers";
        title = "Error";
    
    }

    res.render('math', {title: title ,message: result});
});

app.get('/pandorasbox', (req, res)=> {
    const fs = require('fs');

    // Load the JSON file containing fun facts
    const facts = JSON.parse(fs.readFileSync('facts.json'));
    
    // Fetch a dad joke or a fun fact randomly
    fetch("https://icanhazdadjoke.com/", { 
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then((data) => {
        const joke = data.joke;
    
        // Randomly choose between a dad joke and a fun fact
        const random = Math.random();
        let message;
        if (random < 0.5) {
            message = joke;
        } else {
            const randomIndex = Math.floor(Math.random() * facts.length);
            message = facts[randomIndex].fact;
        }
    
        res.render('pandorasbox', {title: "Pandora's Box", message: message});
    })
})

// Middleware to catch undefined routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('404', {
      title: '404 - Page Not Found',
      message: 'Sorry, the page you are looking for does not exist.'
    });
  });
  
  
  