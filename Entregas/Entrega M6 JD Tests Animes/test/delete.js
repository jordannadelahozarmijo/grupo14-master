const chai = require('chai');
const chaihttp = require('chai-http');
const {servidor} = require('../index'); // exportar tu servidor en el archivo principal

chai.use(chaihttp);

describe('Probando respuesta de servidor para método DELETE/animes', () => {
    it ('Comprueba que respuesta método DELETE es código 200', (done) =>{
        chai
        .request(servidor)
        .delete('/animes?id=ed125f4b-c34d-4643-9f5d-59a331c5d5a9')
        .end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})