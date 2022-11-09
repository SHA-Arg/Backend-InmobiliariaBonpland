import { pool} from '../db.js'

export const ping = async (_req, res) => {
    const [result] = await pool.query('SELECT "Pong" AS reuslt')
    res.json(result[0])
}