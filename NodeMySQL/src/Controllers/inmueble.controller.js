import { pool } from '../db.js'

// REVISAR EXPRESS-PROMISE-ROUTER PARA EVITAR EL TRY CATCH EN PRODUCCION

//OBTENER TODOS LOS INMUEBLES
export const getInmuebles = async (req, res) => {
    //Manejo de errores
    try {
        throw new Error('Error en la base de datos')
        const [rows] = await pool.query('SELECT * FROM propiedades')    
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Error al obtener los inmuebles',
        })
    }
}

//OBTENER UN INMUEBLE ESPESIFICO
export const getInmueble = async (req, res) => {
    //Manejo de errores
    try {
        const [rows] = await pool.query('SELECT * FROM propiedades WHERE id = ?', [req.params.id])  
    
        if (rows.length <= 0) return res.status(404).json({
             message: 'Inmueble no encontrado' 
            })      
    
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message: 'Error al obtener el inmueble',
        })
    }
  
}

//CREAR INMUEBLE
export const createInmueble = async (req, res) => {
    const {tipo_contratacion, cantidad_ambientes, ciudad, pais, metros_cuadrados, precio} = req.body 
    //Manejo de errores
    try {
    const [rows] = await pool.query('INSERT INTO propiedades (tipo_contratacion, cantidad_ambientes, ciudad, pais, metros_cuadrados, precio) VALUES (?, ?, ?, ?, ?, ?)',
     [tipo_contratacion, cantidad_ambientes, ciudad, pais, metros_cuadrados, precio])
     res.send({
         id: rows.insertId,
         tipo_contratacion,
         cantidad_ambientes,
         ciudad,
         pais,
         metros_cuadrados,
         precio
     })
    }catch(error){
        return res.status(500).json({
            message: 'Error al crear el inmueble',
        })
    }   
}

// ELIMINAR INMUEBLE
export const deleteInmueble = async (req, res) => {
    //Manejo de errores
    try{
        const [result] = await pool.query('DELETE FROM propiedades WHERE id = ?', [req.params.id])
    console.log(result)

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Inmueble no encontrado'
    })

    res.sendStatus(204)
    }catch(error){
        return res.status(500).json({
            message: 'Error al eliminar el inmueble',
        })
    }
}

//ACTUALIZAR INMUEBLE
export const updateInmueble = async (req, res) => {
    //Manejo de errores
    const {id} = req.params
    const {tipo_contratacion, cantidad_ambientes, ciudad, pais, metros_cuadrados, precio} = req.body 
    
    try{        
    const [result] = await pool.query('UPDATE propiedades SET tipo_contratacion = IFNULL(?, tipo_contratacion), cantidad_ambientes = IFNULL(?, cantidad_ambientes ), ciudad = IFNULL(?, ciudad), pais = IFNULL(?, pais), metros_cuadrados = IFNULL(?, metros_cuadrados), precio = IFNULL(?, precio) WHERE id = ?', 
    [tipo_contratacion, cantidad_ambientes, ciudad, pais, metros_cuadrados, precio, id])

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Inmueble no encontrado'
    })

    const [rows] = await pool.query('SELECT * FROM propiedades WHERE id = ?', [id])

    res.json(rows[0])

    }catch(error){
        return res.status(500).json({
            message: 'Error al actualizar el inmueble',
        })
    }
}
