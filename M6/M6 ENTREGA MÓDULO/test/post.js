const chai = require('chai');
const chaihttp = require('chai-http');
const {servidor} = require('../index'); // exportar tu servidor en el archivo principal

chai.use(chaihttp);

describe('Probando respuesta de servidor para método POST /animes', () => {
    it ('Comprueba que respuesta método POST es código 200', (done) =>{
        chai
        .request(servidor)
        .post('/animes')
        .send(
            {
            "nombre": "Akira",
            "genero": "Seinen",
            "año": "1988",
            "autor": "Katsuhiro Otomo"
        })
        .end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})