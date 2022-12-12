CREATE TABLE IF NOT EXISTS Fruit (
    fruitId INTEGER NOT NULL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO FRUIT (name)
VALUES ('Apple'), ('Banana'), ('Orange'), ('Strawberry');
