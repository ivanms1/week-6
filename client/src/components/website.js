import React from 'react';


let Website = ({name, url, status}) => (
	<div className="website">
		<h3>Name</h3>
		<p>{name}</p>
		<h3>URL</h3>
		<p>{url}</p>
		<h3>Status</h3>
		<p>{status}</p>
	</div>
	)

export default Website;