const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());


const ds = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'), // Use 'path.join' to specify an absolute path.
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: ds
});

app.listen(3000, () => {
    console.log("Server started at 3000");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.post('/uploads', upload.single('avatar'), (req, res) => {    //in place single replace with array
    console.log("file uploaded sucessfully")
});
