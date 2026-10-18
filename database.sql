-- SmartSole Shoe Store Database

CREATE TABLE shoes (
    id INTEGER PRIMARY KEY,
    brand TEXT,
    condition TEXT,
    price INTEGER,
    stock INTEGER
);

INSERT INTO shoes VALUES (1, 'Nike Air Max', 'New', 5000, 5);
INSERT INTO shoes VALUES (2, 'Gucci Sneakers', 'Used', 3500, 2);
INSERT INTO shoes VALUES (3, 'Puma Runner', 'New', 4200, 3);
