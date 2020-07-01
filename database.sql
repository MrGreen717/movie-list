CREATE DATABASE movieslist;

CREATE TABLE movies(
    movies_id SERIAL PRIMARY KEY,
    movies VARCHAR(255),
    rating NUMERIC(1),
    year1 NUMERIC
);