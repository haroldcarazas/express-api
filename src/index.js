import express from 'express'
import { createUsuario, getMovie, getMovies, getUsuarios } from './controller.js'

const app = express()
app.use(express.json()) // Para poder recibir JSON en las peticiones HTTP

// Mostrar un archivo HTML de bienvenida
app.get('/', (req, res) => { })

// Mostrar todos los usuarios
app.get('/users', getUsuarios)

// Crear un usuario
app.post('/users', createUsuario)

// Mostrar todas las películas
app.get('/movies', getMovies)

// Mostrar una película
app.get('/movies/:id', getMovie)

app.listen(3000, () => console.log('Servidor levantado!'))
