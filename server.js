const express = require('express')
const app = express()
const dirPath = require('path')
const mongojs = require('mongojs')
const bodyParser = require('body-parser')
const config = require('./config')
const db = mongojs(config.db, [config.collection1])

app.use(express.static(dirPath.join(__dirname,'/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/contactlist', (req,res)=>{
     console.log('I receive GET request!')
    // let person1 = {
    //     name: 'Emily Procter',
    //     email: 'emilyp@gmail.com',
    //     phone: '(222) 4568-789-123'
    // }

    // let person2 = {
    //     name: "David Caruso",
    //     email: "davidc@yahoo.com",
    //     phone: '(255) 4865-586-954'
    // }

    // let person3={
    //     name: "Alexx Woods",
    //     email: "alexxw@gmail.com",
    //     phone: '(255) 7789-325-991'
    // }

    // var diaryList = [person1,person2,person3]

    // res.json(diaryList)
    db.contactlist.find((err,docs)=>{        
        console.log(docs)
        res.json(docs)
    })

})


app.post('/contactlist', (req,res)=>{
    //console.log(req.file)
    console.log(req.body)
   
    db.contactlist.insert(req.body, (err,doc)=>{
        res.json(doc)
    })
})

app.delete('/contactlist/:id', (req,res)=>{
    var id = req.params.id
    console.log(id)
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, (err,doc)=>{
        res.json(doc)
    })
})

app.get('/contactlist/:id', (req,res)=>{
    var id = req.params.id
    console.log(id)
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, (err,doc)=>{
        res.json(doc)
    })
})

app.put('/contactlist/:id', (req,res)=>{
    var id = req.params.id
    console.log(req.body.name)
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
        new: true
    },(err,doc)=>{
        res.json(doc)
    })
})



app.listen(config.port, ()=>{
    console.log(`Running server in port: ${config.port}`)
})