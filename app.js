const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require("fs");

app.use(cors())
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const uploadImage = async (req, res, next) => {
    
    let response = {"error": true, "message": "No Data match", "image": ""}
    
    try {
        let path = './images/'+Date.now()+'.jpg'
        let imageData = req.body.imageBase64;
        let base64Data = imageData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
        response = {"error": false, "message": "Save image", "image": path}
        res.send(response);
    } catch (e) {
        next(e);
        res.send(response) ;
    }  
}

app.post('/', uploadImage);

app.get('/', (req, res) => {
    res.send("Hello from Node") ;
});

// Listen server on http://{your ip}:3000
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening port ${port}`);
})