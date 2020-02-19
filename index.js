const express = require('express')
const app = express()
const morgan = require('morgan')

configure = (app) => {
    const bodyParser =  require('body-parser')
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('dev'))
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const setObjectValue = (obj, key, value) => {
    obj[key] = value
}

var list = {}

configure(app)
app.get('/set/:url', (req, res, next) => {
    const url = req.params.url

    if (validURL(url) === false) res.send('error:not url')
    if (list.hasOwnProperty(url)) {
        setObjectValue(list, url, list[url] + 1)
    } else {
        setObjectValue(list, url, 1)
    }
    res.redirect(url)
})

app.get('/see/list', (req, res, next) => {
    res.send(list)
})

app.listen(8000)