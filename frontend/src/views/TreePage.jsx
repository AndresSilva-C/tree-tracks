import { useParams } from "react-router";

function TreePage() {
	const { treeId } = useParams();
	const url = 'http://localhost:3001/api/v1/routes'
	// fetch data here (`/${treeId}`)
	
	return (
		<div>
			<h1>TreeId: {treeId}</h1>
			<p>Url: {url}</p>
		</div>
	);
}

export default TreePage;
