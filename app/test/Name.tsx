import React from 'react'

type NameProps = {
	name: string
}

const Name = ({ name }: NameProps) => {
	return (
		<div>
			<h1>{name}</h1>
		</div>
	)
}

export default Name
