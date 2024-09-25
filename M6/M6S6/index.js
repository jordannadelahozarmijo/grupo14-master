//--------------------------------------------------------------------------------

//Paso 1, instalar yargs y requerirlo en una constante
const yargs = require ('yargs');
const {v4: uuidv4} = require ('uuid');
const fs = require ('fs').promises;

//--------------------------------------------------------------------------------

//Paso 2: definir la configuración de cada comando y utilizarlo como tercer argumento

//Crear
const createConfig = {
    titulo : {
        describe: 'nombre del libro',
        alias: 't',
        demandOption: true
    },
    autor: {
        describe: 'creador del libro',
        alias: 'a',
        demandOption: true
    }
}

//Actualizar
const updateConfig = {
    titulo : {
        describe: 'nombre del libro',
        alias: 't',
        demandOption: true
    },
    autor: {
        describe: 'creador del libro',
        alias: 'a',
        demandOption: true
    },
    id: {
        describe: 'id del libro',
        alias: 'i',
        demandOption: true
    }
}

//Eliminar
const deleteConfig = {
    id : {
        describe: 'identificador de libro',
        alias: 'i',
        demandOption: true
    },
}

//-------------------------------------------------------------------------------- 

//Definir una función para crear el ID  y agregarlo como cuarto parámentro con función flecha
const funtionCreate = async ({titulo, autor}) => {
    try  {
        //Instalar paquete "npm install uuid"
        const id = uuidv4().slice(0,8);
        
        //definir el objeto que será insertado en el array del archivo libros.txt
        const nuevoLibro = {id : id, titulo : titulo, autor : autor};

        //obtener el contenido actual del archivo e ir sumando nuevos datos
        const libros = await fs.readFile('libros.txt');
        const arrayLibros = JSON.parse(libros);

        //agregar nuevo libro al array
        arrayLibros.push(nuevoLibro)

        await fs.writeFile('libros.txt', JSON.stringify(arrayLibros, null, 2));
        console.log('Nueva tarea agregada');
    } 
    catch (error) {
        console.error('Error al procesar los libros:', error);
    }
}

const functionRead = async () => {
    const libros = await fs.readFile('libros.txt')
    const arrayLibros = JSON.parse(libros)
    let contador = 0;
    
    for (todosloslibros of arrayLibros) {
        const { titulo, autor, id } = todosloslibros;
        contador++ 
        console.log(`Posición: ${contador}`)
        console.log(`Título: ${titulo}`)
        console.log(`Autor: ${autor}`)
        console.log(`Código de barra: ${id}`)
        console.log(arrayLibros)
    }
};

const functionUpdate = async ({id, titulo, contenido}) => {
    const libros = await fs.readFile('libros.txt')
    const arrayLibros = JSON.parse(libros)
    const actuales = arrayLibros.findIndex ( libros => libros.id === id);
}


//--------------------------------------------------------------------------------

//Paso 3, definir los comandos y utilizar las configuraciones
const args = yargs
.command ('create', 'Crear un nuevo libro', createConfig, (argv) => funtionCreate(argv))
.command ('read', 'Mostrar todos los libros', {}, (argv) => functionRead())
.command ('update', 'Actualizar o modificar un libro', updateConfig, (argv) => functionUpdate(argv) )
.command ('delete', 'Eliminar un libro', deleteConfig)
.help()
.argv

//--------------------------------------------------------------------------------

// Utilizar comandos en la terminal
// node index.js create --titulo="" --autor=""
// node index.js read
// node index.js update --titulo="" --autor="julio verne"
// node index.js delete --i=""