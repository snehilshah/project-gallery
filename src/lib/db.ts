import mysql from 'mysql2'

const pool = mysql.createPool({
	host: 'aws.connect.psdb.cloud',
	user: '3te6n0yeratnlvjyuox2',
	database: 'project-gallery',
	password: process.env.DB_PASSWORD,
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
