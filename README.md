# Forever
## Description

This repository serves develop application in JavaScript, created with Nodejs, Express, MongoDB.

## Installation

Install packages:
```html
$ npm install
```

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/Forever.git [NAME APP]
```
Follow the following steps and you're good to go! Important:


Start server to our API (includes auto refreshing):

```html
$ cd [NAME APP]
$ npm run dev
```


## Coding

### Server
```javascript
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
```

### API
```javascript
...
app.post('/contactlist', (req,res)=>{
    //console.log(req.file)
    console.log(req.body)
   
    db.contactlist.insert(req.body, (err,doc)=>{
        res.json(doc)
    })
})
...
```

### Controller
```javascript
const diaryApp = angular.module('diaryApp', [])

diaryApp.controller('AppCtrl', function($scope,$http) {
    console.log("Hello World from controller!")

    var refresh = ()=>{
        $http({
            method: 'GET',
            url: '/contactlist'
        })
        .then((response,data)=>{
            console.log("I got the data I requested")
            $scope.contactlist=response.data
            $scope.list = {}        
        })
        .catch((err)=>{
            res.send('ERROR!!')
        })
    }

    refresh()

...

}
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/Forever. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
