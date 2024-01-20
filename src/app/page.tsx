import db from '@/lib/db'

export default async function Home() {
	const [results] = await db.query('SELECT * FROM products', ['Page', 45])
  console.log(results)
	return (
		<main>
			<h1 className='text-2xl font-abeezee'>Products</h1>
		</main>
	)
}
