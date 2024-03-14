import mysql2 from 'mysql2/promise'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from './config.js'

export const pool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE
})
