export default async function Home() {
	const [results] = await db.query('SELECT * FROM products')
	console.log(results)
	let res = JSON.stringify(results)
	return (
		<main className="bg-white">
			<h1 className="text-8xl text-center uppercase">Project Of The Day</h1>
		</main>
	)
}
