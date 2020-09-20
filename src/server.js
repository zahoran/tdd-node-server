import express from 'express';
import db from './db';

const app = express();

app.get('/users/:username', async (req, res) => {
    const {username} = req.params;
    try {
        const data = await db.getUserByUsername(username);
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({error: 'User not found!'});
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

export {app};