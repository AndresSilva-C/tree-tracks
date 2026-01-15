import { Link } from "react-router";
import { useEffect, useState } from 'react'
import TreeListing from './components/TreeListing'
import Navbar from './components/Navbar'

function Browse() {
	const [trees, setTrees] = useState(false);
	const url = 'http://localhost:3001/api/v1/routes'
	
	function getTrees() {
		fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			var listings = data.map(tree => 
				<li key={tree.map_link.slice(-10, -4)}>
					<TreeListing tree_obj={tree} />
				</li>
			);
			return <ul className="">{listings}</ul>
		})
		.then(data => {
			setTrees(data);
		});
	}

	useEffect(() => {
		getTrees();
	}, []);
	
	return (
		<div className="absolute top-0 start-0 w-full h-full bg-green-50">
			<Navbar />
			<div className="justify-items-center mt-30 pl-35 pb-20 bg-green-50">
				<div className="grid grid-cols-2 gap-34 font-serif text-md text-start mb-4 mr-32">
					<b> Common Name </b>
					<b> Scientific Name (taxon) </b>
				</div>
				{trees ? trees : 'There is no tree data available'}
			</div>
		</div>
	);
}
export default Browse;