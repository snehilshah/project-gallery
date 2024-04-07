import mysql from 'mysql2'
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	database: 'project-gallery',
	password: process.env.DB_PASSWORD,
	port: 15464,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
	ssl: {
		rejectUnauthorized: false,
	},
})

export default pool.promise()
