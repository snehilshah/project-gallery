import { comments } from './data'

export async function GET() {
	return Response.json(comments)
}

export async function POST(request: Request) {
	const comment = await request.json()
  
	const new_comment = {
		id: comments.length + 1,
		comment: comment.text,
	}
  
	console.log(comment.text)
	comments.push(new_comment)
	return new Response(JSON.stringify(new_comment), {
		headers: { 'content-type': 'application/json' },
		status: 201,
	})
}
