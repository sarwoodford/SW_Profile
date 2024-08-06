const express = require('express');
const bodyParse = require('body-parse');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require(path);
const port = 3000;


let dataBase = new sqlite3.Database('../database/emails.db', (err) => {
    if(err){
        console.log('error opening Database.', err)
    } else{
        console.log('emails connected.')
    }
});

dataBase.run(`CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL
)`);

app.use(bodyParse.urlencoded({ extended: true }));

app.post('/subit-email', (req, res) => {
    let email = req.body.email;
    if(!email){
        res.status(400).send('email is required.')
        return;
    }
    let sql = `INSET INTO emails (email) VALUES (?)`;
    dataBase.run(sql, [email], (err) => {
        if (err){
            console.log(err.message);
            res.status(500).send('error in Database.');
        }else {
            res.send('email saved.')
        }
    });
});

app.listen(port, () => {
    console.log(`server running at https://localhost:${port}/`)
});
