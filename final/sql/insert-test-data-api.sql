INSERT INTO vehicle (make, model, color, capacity, mpg, licensePlate)
VALUES ('Ford', 'F150', 'black', '5', '25', '123ABC');
INSERT INTO account (first_name, last_name, email, password)
VALUES ('Zelda', 'Ziffle', 'zelda@ziffle.com', 'SuperSecret2');

id              serial not null
                        constraint vehicle_id
                            primary key,
    make            varchar not null,
    model           varchar not null,
    color           varchar not null,
    vehicleTypeId   serial  not null,
                        /* constraint vehicle_type_id
                            foreign key, */
    capacity        varchar not null,
    mpg             varchar not null,
    licenseState    varchar not null,
    licensePlate