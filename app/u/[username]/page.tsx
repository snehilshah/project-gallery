import { Metadata } from "next"

export const metadata: Metadata = {
	title: "User Page",
	description: "This is the users page"
}

export default function userPage({
	params,
}: {
	params: { username: string }
}) {
	return (
		<div>
			<h1>User Page for {params.username}</h1>
		</div>
	)
}
