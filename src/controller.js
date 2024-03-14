import { pool } from './db.js'

export const getUsuarios = async (req, res) => {
  const [users] = await pool.query('SELECT * FROM users') // users[0]
  res.json(users)
}

export const createUsuario = async (req, res) => {
  try {
    const { email, nombre, password } = req.body
    const fechaNacimiento = req.body.fecha_nacimiento

    if (!email || !nombre || !password || !fechaNacimiento) {
      return res.status(400).json({ message: 'Faltan datos.' })
    }

    const sqlString =
        'INSERT INTO users (email, nombre, password, fecha_nacimiento) VALUES (?, ?, ?, ?)'
    const result = await pool.execute(sqlString, [
      email,
      nombre,
      password,
      fechaNacimiento
    ])

    const id = result[0].insertId

    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

    res.json(user[0])
  } catch (error) {
    if (error.errno === 1062) {
      return res.status(400).json({ message: 'El usuario ya existe.' })
    }

    return res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export const getMovies = async (req, res) => {
  const [movies] = await pool.query('SELECT m.id, m.title, mt.name AS media_type, m.year_released, m.price FROM movies m LEFT JOIN media_types mt ON m.media_type_id = mt.id;')
  const [actorsMovies] = await pool.query(`
      SELECT m.id AS movie_id, m.title, a.id as actor_id, a.name FROM movies m
      INNER JOIN actors_movies am ON m.id = am.movie_id
      INNER JOIN actors a ON am.actor_id = a.id;
    `)

  for (const movie of movies) {
    const actorsFiltered = actorsMovies.filter(actor => actor.movie_id === movie.id)
    movie.actors = actorsFiltered
  }

  res.json(movies)
}

export const getMovie = async (req, res) => {
  const { id } = req.params
  res.json({ id })
}
