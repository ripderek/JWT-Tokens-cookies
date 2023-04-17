import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt'
import { authenticateToken } from '../middleware/authorization.js'

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await pool.query('Select * from Users');
        res.json({ users: users.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
)

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const result = await pool.query('Insert into Users (user_name, user_email, user_password) values ($1,$2,$3) RETURNING*  ', [
            req.body.name,
            req.body.email,
            hashedPassword
        ]);
        console.log(result.rows);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }
})


export default router;