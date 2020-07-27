const express = require('express');
const bodyParser = require('body-parser')
const dotenv =require('dotenv');
const fetch = require('node-fetch');
const { url } = require('inspector');

//setting up env file
const result = dotenv.config()

//setting up app
const app =express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//setting public folder
app.use(express.static('public'))

app.get('/submit',(req,res)=>{
    res.end("pog");
})
app.post('/submit',(req,res)=>{
    console.log(req.body)
    data=req.body.data;
    const Key =process.env.Key;
    const ID=process.env.ID;
    console.log(data);
    if(data.name=="")return;
    let url=`https://api.edamam.com/search?q=${data.name}&app_id=${ID}&app_key=${Key}`
    if(data.rangeFrom && data.rangeTo)
    url+=`&from=${data.rangeFrom}&to=${data.rangeTo}`;
    if(data.cuisine)
    url+=`&cuisineType=${data.cuisine}`;
    if(data.meal)
    url+=`&mealType=${data.meal}`;
    if(data.dish)
    url+=`&dishType=${data.dish}`;
    if(data.calFrom && data.calTo)
    url+=`&calories=${data.calFrom}-${data.calTo}`;
    if(data.prepFrom && data.prepTo)
    url+=`&time=${data.prepFrom}-${data.prepTo}`;

console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        res.json({data:response})
    });


    
})
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    if (result.error) {
        throw result.error
      }
           console.log('App running on port '+PORT);
})