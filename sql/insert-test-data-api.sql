INSERT INTO "user" ("firstName", "lastName", "email", "password", "phone", "isAdmin")
VALUES ('Raquel', 'Rosado', 'rockrosado@gmail.com', 'Passw0rd', '414-232-1010', true );
INSERT INTO "user" ("firstName", "lastName", "email", "password", "phone", "isAdmin")
VALUES ('Marcos', 'Rosado', 'marcos@gmail.com', 'Passw0rd', '414-272-1010', false );

INSERT INTO driver ("userId", "licenseNumber", "licenseState")
VALUES (1, 'ABC123', 'WI');
INSERT INTO driver ("userId", "licenseNumber", "licenseState")
VALUES (2, '1234BC', 'IL');


INSERT INTO passenger ("userId", "rideId")
VALUES (1, 1);

-- option one that does not include the FKs
INSERT INTO vehicle ("make", "model", "color", "capacity", "mpg", "licensePlate")
VALUES ('Ford', 'F150', 'black', 5, 25, '123ABC');
-- option two that does include the FKs
INSERT INTO vehicle ("make", "model", "color", "vehicleTypeId", "capacity", "mpg", "licenseState", "licensePlate")
VALUES ('Ford', 'F150', 'black', 1, 5, 25, 'WI', '123ABC');



INSERT INTO ride (date, time, distance, "fuelPrice", fee, "vehicleId", "fromLocationId", "toLocationId")
VALUES ('2021-12-14', '07:09:19', 123.5, 2.29, 8.00, 1, 1, 2)

INSERT INTO vehicle_type ("vehicleType")
VALUES ('Pickup Truck');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('Minivan');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('SUV');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('Jeep');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('Sports Car');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('Electric Car');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('Sedan');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('Convertible');
INSERT INTO vehicle_type ("vehicleType")
VALUES ('CUV');

INSERT INTO state ("abbreviation", "name")
VALUES ('AL','Alabama');
INSERT INTO state ("abbreviation", "name")
VALUES ('AK','Alaska');
INSERT INTO state ("abbreviation", "name")
VALUES ('AZ','Arizona');
INSERT INTO state ("abbreviation", "name")
VALUES ('AR','Arkansas');
INSERT INTO state ("abbreviation", "name")
VALUES ('CA','California');
INSERT INTO state ("abbreviation", "name")
VALUES ('CO','Colorado');
INSERT INTO state ("abbreviation", "name")
VALUES ('CT','Connecticut');
INSERT INTO state ("abbreviation", "name")
VALUES ('DE','Delaware');
INSERT INTO state ("abbreviation", "name")
VALUES ('DC','District of Columbia');
INSERT INTO state ("abbreviation", "name")
VALUES ('FL','Florida');
INSERT INTO state ("abbreviation", "name")
VALUES ('GA','Georgia');
INSERT INTO state ("abbreviation", "name")
VALUES ('HI','Hawaii');
INSERT INTO state ("abbreviation", "name")
VALUES ('ID','Idaho');
INSERT INTO state ("abbreviation", "name")
VALUES ('IL','Illinois');
INSERT INTO state ("abbreviation", "name")
VALUES ('IN','Indiana');
INSERT INTO state ("abbreviation", "name")
VALUES ('IA','Iowa');
INSERT INTO state ("abbreviation", "name")
VALUES ('KS','Kansas');
INSERT INTO state ("abbreviation", "name")
VALUES ('KY','Kentucky');
INSERT INTO state ("abbreviation", "name")
VALUES ('LA','Louisiana');
INSERT INTO state ("abbreviation", "name")
VALUES ('ME','Maine');
INSERT INTO state ("abbreviation", "name")
VALUES ('MD','Maryland');
INSERT INTO state ("abbreviation", "name")
VALUES ('MA','Massachusetts');
INSERT INTO state ("abbreviation", "name")
VALUES ('MI','Michigan');
INSERT INTO state ("abbreviation", "name")
VALUES ('MN','Minnesota');
INSERT INTO state ("abbreviation", "name")
VALUES ('MS','Mississippi');
INSERT INTO state ("abbreviation", "name")
VALUES ('MO','Missouri');
INSERT INTO state ("abbreviation", "name")
VALUES ('MT','Montana');
INSERT INTO state ("abbreviation", "name")
VALUES ('NE','Nebraska');
INSERT INTO state ("abbreviation", "name")
VALUES ('NV','Nevada');
INSERT INTO state ("abbreviation", "name")
VALUES ('NH','New Hampshire');
INSERT INTO state ("abbreviation", "name")
VALUES ('NJ','New Jersey');
INSERT INTO state ("abbreviation", "name")
VALUES ('NM','New Mexico');
INSERT INTO state ("abbreviation", "name")
VALUES ('NY','New York');
INSERT INTO state ("abbreviation", "name")
VALUES ('NC','North Carolina');
INSERT INTO state ("abbreviation", "name")
VALUES ('ND','North Dakota');
INSERT INTO state ("abbreviation", "name")
VALUES ('OH','OHIO');
INSERT INTO state ("abbreviation", "name")
VALUES ('OK','Oklahoma');
INSERT INTO state ("abbreviation", "name")
VALUES ('OR','Oregon');
INSERT INTO state ("abbreviation", "name")
VALUES ('PA','Pennsylvania');
INSERT INTO state ("abbreviation", "name")
VALUES ('PR','Puerto Rico');
INSERT INTO state ("abbreviation", "name")
VALUES ('RI','Rhode Island');
INSERT INTO state ("abbreviation", "name")
VALUES ('SC','South Carolina');
INSERT INTO state ("abbreviation", "name")
VALUES ('SD','South Dakota');
INSERT INTO state ("abbreviation", "name")
VALUES ('TN','Tennessee');
INSERT INTO state ("abbreviation", "name")
VALUES ('TX','Texas');
INSERT INTO state ("abbreviation", "name")
VALUES ('UT','Utah');
INSERT INTO state ("abbreviation", "name")
VALUES ('VT','Vermont');
INSERT INTO state ("abbreviation", "name")
VALUES ('VA','Virginia');
INSERT INTO state ("abbreviation", "name")
VALUES ('WA','Washington');
INSERT INTO state ("abbreviation", "name")
VALUES ('WV','West Virginia');
INSERT INTO state ("abbreviation", "name")
VALUES ('WI','Wisconsin');
INSERT INTO state ("abbreviation", "name")
VALUES ('WY','Wyoming');

INSERT INTO location (name, address, city, state, "zipCode")
VALUES ('Bergwall Hall', '236 W Reade Ave', 'Upland', 'IN', '46989');
INSERT INTO location (name, address, city, state, "zipCode")
VALUES ('Samuel Morris Hall', '236 W Reade Ave', 'Upland', 'IN', '46989');