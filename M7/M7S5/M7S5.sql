
//Ejercicio 1 crear base de datos en postgres
CREATE TABLE "cuentas" (
 "id" SERIAL,
 "nombre" VARCHAR(50) NOT NULL,
 "balance" DEC(15,2) NOT NULL,
 PRIMARY KEY ("id")
);


INSERT INTO "cuentas" 
	("nombre","balance")
VALUES
	('Jose', 10000),
	('Pedro', 7000);

SELECT * FROM cuentas;


//Ejercicio 2 transferir de una cuenta a otra 
//inconsistencia de transacciones
UPDATE cuentas
SET balance= balance - 1000
WHERE id = 1;

UPDATE cuentas
SET balance= balance + 1000
WHERE id = 2;


// Ejercicio 3 REALIZAR TRANSACCIONES CON BEGIN, COMMIT Y ROLLBACK

BEGIN;
UPDATE cuentas
SET balance= balance - 1000
WHERE id = 1;

UPDATE cuentas
SET balance= balance + 1000
WHERE id = 2;
SELECT * FROM cuentas;

COMMIT;


//reestablecer la transacción 
BEGIN;

UPDATE cuentas
SET balance= balance - 1000
WHERE id = 1;

UPDATE cuentas
SET balance= balance + 1000
WHERE id = 2;

SELECT * FROM cuentas;
-- Restablecemos los cambios
ROLLBACK;

SELECT * FROM cuentas;