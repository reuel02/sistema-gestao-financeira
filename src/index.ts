import express from 'express'
import rotas from './rotas.js'

const app = express()

app.use(express.json())

app.use(rotas)

app.listen(process.env.PORT, () => {
    console.log('servidor inicializado!')
})