import mysql from 'mysql2'

const pool = mysql.createPool({
	host: process.env.NEXT_PUBLIC_HOST,
	user: process.env.NEXT_PUBLIC_USERNAME,
	database: process.env.NEXT_PUBLIC_DATABASE,
	password: process.env.NEXT_PUBLIC_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
	ssl: {
		rejectUnauthorized: true,
	},
})

export default pool.promise()
