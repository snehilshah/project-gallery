import mysql from 'mysql2'

const pool = mysql.createPool({
	host: 'aws.connect.psdb.cloud',
	user: '6tz5ft11il2ksuq1c6m4',
	database: 'project-gallery',
	password: 'pscale_pw_yeCKSUjjqCHQ1MHZPyyQTeUqE5MCYReuBjONekUgYh2',
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
