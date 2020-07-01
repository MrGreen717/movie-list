const express = require('express')
const router = express.Router()
const pool = require('../db/db')

// ROUTES // 

//Create object
router.post('/movies', async (req, res) => {
    try {
        const { movies, rating, year1 } = req.body
        const newMovie = await pool.query(
        "INSERT INTO movies (movies, rating, year1) VALUES($1, $2, $3) RETURNING *",
        [movies, rating, year1]
        )
        
        res.json(newMovie.rows)
    } catch (e) {
        console.error(e.message)
    }
})

//Get all movies
router.get('/movies', async (req, res) => {
    try {
        const allMovies = await pool.query("SELECT * FROM movies")
        res.json(allMovies.rows)
    } catch (e) {
        console.error(e.message)
    }
})

//Get one movie
router.get('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const movie = await pool.query("SELECT * FROM movies WHERE movies_id = $1", [id])

        res.json(movie.rows[0])
    } catch (e) {
        console.error(e.message)
    }
})

//Update a movie
router.put('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { movies, rating, year1 } = req.body
        const updateMovie = await pool.query(
        "UPDATE movies SET movies = $1, rating = $2, year1 = $3 WHERE movies_id = $4", 
        [movies, rating, year1, id]
        )
        res.json('Movie was updated')
    } catch (e) {
        console.error(e.message)
    }
})

//Delete movie
router.delete('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteMovie = await pool.query("DELETE FROM movies WHERE movies_id = $1", [
            id
        ])

        res.json("Movie was deleted")
    } catch (e) {
        console.error(e.message)
    }
})


module.exports = router