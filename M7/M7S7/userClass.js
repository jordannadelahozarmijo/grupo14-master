class User {
    // Creamos el constructor
    constructor(id, email, firstname, lastname, age) {
        this._id = id;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
        this._age = age;
    }
    // Definición de los métodos Getters
    get email() {
        return this._email
    }
    get firstname() {
        return this._firstname
    }
    get lastname() {
        return this._lastname
    }

    // Definición de Métodos Setters
    set lastname(newLastname) {
        newLastname = newLastname.trim();
        if (newLastname === '') {
            console.log("El lastname no puede ser vacío");
        }
        this._lastname = newLastname;
    }

}

// Inicializamos la clase
let user = new User(1, "usuario@test.com", "José", "Perez", 25)

// Accesando a la propiedad del objeto, atributo email
console.log(user._email)

// Obteniendo el atributo de email por medio del método getter
console.log(user.email)

// Accediendo como un método

// TypeError: user.email is not a function
console.log(user.email)
//-----------------------------------------------------------------

// Obteniendo el atributo de lastname por medio del método getter
console.log(user)
// Cambiando el lastname por setter
user.lastname = "Sánchez"
// Verificando el cambio por el getter
console.log(user)