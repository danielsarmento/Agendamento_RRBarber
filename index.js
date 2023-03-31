import express from 'express'
import cors from 'cors'
import routes from './src/routes/routes.js'
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

app.listen(4000, () => {
    console.log('API listening on port 4000')
})