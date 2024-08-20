const express = require('express');
const app = express();
const PORT = 3001;
const mysql = require('mysql');
const cors = require('cors');
const { encrypt, decrypt } = require('./EncryptionHandler');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root1234',
    database: 'passwordmanager',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

app.post('/addpassword', (req, res) => {
    const { password, title } = req.body;
    const hashedPassword = encrypt(password);

    db.query(
        'INSERT INTO passwords (password, title, iv) VALUES (?, ?, ?)',
        [hashedPassword.password, title, hashedPassword.iv],
        (err, result) => {
            if (err) {
                console.error('Error inserting password:', err);
                res.status(500).send('Internal Server Error');
            } else {
                // Send the new password data back to the frontend
                const newPassword = {
                    id: result.insertId,
                    password: hashedPassword.password,
                    iv: hashedPassword.iv,
                    title: title,
                };
                res.status(201).send(newPassword);
            }
        }
    );
});




app.get('/showpasswords', (req, res) => {
    db.query('SELECT * FROM passwords;', (err, result) => {
        if (err) {
            console.error('Error fetching passwords:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(result);
        }
    });
});

app.post('/decryptpassword', (req, res) => {
    try {
        const decrypted = decrypt(req.body);
        res.status(200).send(decrypted);
    } catch (error) {
        console.error('Error decrypting password:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/deletepassword/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM passwords WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting password:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send({ message: 'Password deleted successfully' });
        }
    });
});

app.post('/encryptpassword', (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = encrypt(password);
        res.status(200).send(hashedPassword.password);
    } catch (error) {
        console.error('Error encrypting password:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
