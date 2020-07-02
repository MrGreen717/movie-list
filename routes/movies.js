const express = require('express')
const router = express.Router()
const pool = require('../db/db')

// ROUTES // 

//Create page
router.get('/add', async (req, res) => {
    res.render('create', {
        title: 'Add new movie'
    })
})

//Create object
router.post('/add', async (req, res) => {
    try {
        const { movies, rating, year1 } = req.body
        const newMovie = await pool.query(
        "INSERT INTO movies (movies, rating, year1) VALUES($1, $2, $3) RETURNING *",
        [movies, rating, year1]
        )
        
        res.redirect('/movies')
    } catch (e) {
        console.error(e.message)
    }
})

//Get all movies
router.get('/movies', async (req, res) => {
    try {
        const allMovies = await pool.query("SELECT * FROM movies")
        const moviesList = allMovies.rows
        
        res.render('index', {
            title: 'Movies list',
            moviesList
        })
        
    } catch (e) {
        console.error(e.message)
    }
})

//Get one movie
router.get('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const movieGet = await pool.query("SELECT * FROM movies WHERE movies_id = $1", [id])
        const movie = movieGet.rows[0]
        res.render('update', {
            title: 'Update movie',
            movie
        })
    } catch (e) {
        console.error(e.message)
    }
})

//Update a movie
router.post('/movies/:id/edit', async (req, res) => {
    try {
        const { id } = req.params
        const { movies, rating, year1 } = req.body
        const updateMovie = await pool.query(
        "UPDATE movies SET movies = $1, rating = $2, year1 = $3 WHERE movies_id = $4", 
        [movies, rating, year1, id]
        )
        res.redirect('/movies')
    } catch (e) {
        console.error(e.message)
    }
})

//Delete movie
router.post('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteMovie = await pool.query("DELETE FROM movies WHERE movies_id = $1", [
            id
        ])

        res.redirect('/movies')
    } catch (e) {
        console.error(e.message)
    }
})

module.exports = router