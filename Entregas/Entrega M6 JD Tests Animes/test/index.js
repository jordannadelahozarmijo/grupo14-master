
const chai = require('chai');
const chaihttp = require('chai-http');
const {servidor} = require('../index'); // exportar tu servidor en el archivo principal

chai.use(chaihttp);

describe('Probando respuesta de servidor para método GET /animes', () => {
    it ('Comprueba método GET responde con código 200', (done) =>{
        chai.request(servidor).get('/animes').end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})






