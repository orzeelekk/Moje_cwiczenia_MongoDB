import express from 'express'
import rateLimit from 'express-rate-limit'
import compression from "compression"
import morgan from 'morgan'
const app = express();

const user = {
    name: "Pan Pawel",
    modified: new Date()
}

//ten app set i app get sa powiazane i musza byc wypisane aby skorzystac z warunkowego wysylania danych
app.set('etag','strong')
app.get('/user', (req,res) => {
        res.append('Last-Modified',user.modified.toString())
        res.json(user)
    }
)
app.put('/user/:name',(req,res) => {
    user.name = req.params.name
    user.modified = new Date()
    res.send('Nowe name i date')
})


const limiter = rateLimit({
    windowMs:120000,
    max: 4,
})
app.use(compression({level:9}))
app.use(limiter)
app.use(
    morgan(function (tokens, req, res) {
        return [tokens.method(req, res), tokens.url(req,res),'rapapara'].join(' ');
    })
)
app.get('/',(req,res) => {
    res.send('Cos tam')
})
app.get('/test/:tekst',(req,res) => {
    const reverse = req.params.tekst.split('').reverse().join('')
    res.send(reverse.repeat(1000))
})


app.listen(5000,() => {
    console.log("Listening on 5000")
})