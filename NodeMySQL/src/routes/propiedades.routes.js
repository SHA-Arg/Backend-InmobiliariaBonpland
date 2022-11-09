import { Router } from 'express'
import {getInmuebles, createInmueble, updateInmueble, deleteInmueble, getInmueble } from '../controllers/inmueble.controller.js'

const router = Router()

router.get('/inmuebles', getInmuebles);

router.get('/inmueble/:id', getInmueble);

router.post('/inmueble', createInmueble);
//PARA ACTUALIZAR TODOS LOS CAMPOS
//router.put('/inmueble/:id', updateInmueble);
//PARA ACTUALIZAR UN CAMPO ESPECIFICO
router.patch('/inmueble/:id', updateInmueble);

router.delete('/inmuebles/:id', deleteInmueble);

export default router