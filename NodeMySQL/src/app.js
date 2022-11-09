import express from 'express'
import propiedadesRoutes from './routes/propiedades.routes.js'
import indexRoutes from './routes/index.routes.js'


const app = express() 

app.use(express.json())

app.use(indexRoutes)
app.use('/api',propiedadesRoutes)

//MIDDLEWARE PARA ERRORES 404
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ednpoint no encontrado'
    })
})

export default app