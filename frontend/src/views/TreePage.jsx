import { useParams } from "react-router";
import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar";
import DistributionMap from "./components/DistributionMap";

function TreePage() {
	const { treeId } = useParams();
	const [treeData, setTreeData] = useState([]);
	const [treeName, setTreeName] = useState('');
	const iucn_map = {'? ':'Data Not Found', 'NE':'Not Evaluated', 'DD':'Data Deficient', 'LC':'Least Concern', 'NT':'Near Threatened',
		 				 'VU': 'Vulnerable', 'EN':'Endangered', 'CR':'Critically Endangered', 'EW':'Extinct in the Wild', 'EX': 'Extinct'};

	const url = 'http://localhost:3001/api/v1/routes'

	function getTreeData() {
		fetch(url + `/tree-info/${treeId}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data[0]);
			setTreeData(data[0]);
			var name = toTitleCase(data[0].common_name);
			setTreeName(name);
		});
	}

	function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

	useEffect(() => {
		getTreeData();
	}, []);
	
	return (
		<div className="absolute top-0 start-0 w-full h-full bg-green-50 overflow-hidden">
			<Navbar />
			<div className="mt-30">
				<div className="font-serif font-xl text-center justify-items-center">
					<h1> {treeName} </h1>
					<h2 className="text-2xl mt-3"> {treeData.taxon} </h2>
				</div>
				<div className="grid grid-cols-2 w-full justify-center mb-7 mt-5 font-serif">
					<div>
						<h2 className="text-2xl mb-5"> Conservation Status </h2>
						<div className="ml-20 grid grid-cols-2 place-content-center w-3/4">
							<p className="mb-2"> IUCN Red List Category: </p>
							<p className="mb-2"> {treeData.iucn} - {iucn_map[treeData.iucn]} </p>
							<p className="mb-2"> Protected in-situ: </p>
							<p className="mb-2"> {treeData.in_situ} </p>
							<p className="mb-2"> Protected ex-situ: </p>
							<p className="mb-2"> {treeData.ex_situ} </p>
						</div>
					</div>
					<div className="justify-items-center">
						<h2 className="text-2xl mb-5"> Distribution Map </h2>
						<DistributionMap taxonKey={treeData.taxonkey} />
					</div>
				</div>
				<div> 
					More information
					<a href={`https://www.gbif.org/species/${treeData.taxonkey}`} target="_blank" rel="noopener noreferrer"> here </a>
					{treeData.info_link != 'None' && <p>or <a href={treeData.info_link} target="_blank" rel="noopener noreferrer"> here</a></p> }
				</div>
			</div>
		</div>
	);
}

export default TreePage;
