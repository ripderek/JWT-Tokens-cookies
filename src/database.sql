/*
    No es necesario crear una bd nueva en este caso usare la bd "Practica Crud"
*/

/*
    Crear una tabla para guardar los usuarios
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table Users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name text not null,
    user_email text not null,
    user_password text not null
);

INSERT INTO Users(user_name, user_email, user_password) values ('Bob', 'bob@gmail.com', 'bob');