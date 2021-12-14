drop table if exists vehicle;

create table vehicle (
    id              serial not null
                        constraint vehicle_id
                            primary key,
    make            varchar not null,
    model           varchar not null,
    color           varchar not null,
    /* vehicleTypeId   serial  not null,
                        constraint vehicle_type_id
                            foreign key, */
    capacity        integer not null,
    mpg             float not null,
    /* licenseState    integer not null,
                         constraint abbreviation
                            foreign key, */
    licensePlate    varchar not null
);

comment on table vehicle is 'Vehicle Information';



