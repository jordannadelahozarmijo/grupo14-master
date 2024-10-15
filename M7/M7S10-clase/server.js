const express = require ('express');
const app = express();
const port = 3000;
const regionController = require ('./controllers/region.controller');

app.use(express.json())

//Crear región a través del controlador
app.post('/regiones', async (req, res) => {
    regionController.CrearRegion(req,res);
})


app.listen(port, () => {
    console.log ('El servidor está corriendo en el puerto' + '${port}');
})