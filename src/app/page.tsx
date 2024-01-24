import db from '@/lib/db'
import { Button } from '@/components/ui/button'

export default async function Home() {
	const [results] = await db.query('SELECT * FROM products', ['Page', 45])
  console.log(results)
	return (
		<main className='bg-white'>
			<h1 className='text-2xl font-abeezee'>Products</h1>
			<Button>lmao</Button>
		</main>
	)
}
