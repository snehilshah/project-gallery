export default function projectPage({
	params,
}: {
	params: { username: string; projectid: string }
}) {
	return (
		<div>
			<h1>Project page for {params.username} of project {params.projectid}</h1>
		</div>
	)
}
