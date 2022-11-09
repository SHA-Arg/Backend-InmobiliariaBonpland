// LECTURA DE VARIABLES DE ENTORNO

import{ config } from 'dotenv'

config()
/* Para que lea las variables de entorno por consola
console.log(process.env.PORT)
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_NAME)
*/

export const PORT = process.env.PORT || 3000
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || 'inmobiliaria DB'
export const DB_PORT = process.env.DB_PORT || 3306

