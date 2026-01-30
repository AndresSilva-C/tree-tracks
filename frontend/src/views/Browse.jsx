import { Link } from "react-router";
import { useEffect, useState } from 'react'
import TreeListing from './components/TreeListing'
import Navbar from './components/Navbar'

function Browse() {
	const [trees, setTrees] = useState(false);
	const [sortMethod, setSortMethod] = useState(0);
    const [buttonState, setButtonState] = useState(0);
	const sortMethods = [sortCommonNameDesc, sortCommonNameAsc, sortTaxonDesc, sortTaxonAsc, sortIucnDesc, sortIucnAsc];

    function sortCommonNameDesc(a, b){
        let x = a.common_name.toLowerCase();
        let y = b.common_name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }
    function sortCommonNameAsc(a, b){
        let x = a.common_name.toLowerCase();
        let y = b.common_name.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
    }
    function sortTaxonDesc(a, b){
        let x = a.taxon.toLowerCase();
        let y = b.taxon.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }
    function sortTaxonAsc(a, b){
        let x = a.taxon.toLowerCase();
        let y = b.taxon.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
    }
    function sortIucnDesc(a, b){
        const ratings = ['NE', 'DD', 'LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX'];
        let x = ratings.indexOf(a.iucn);
        let y = ratings.indexOf(b.iucn);
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }
    function sortIucnAsc(a, b){
        const ratings = ['NE', 'DD', 'LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX'];
        let x = ratings.indexOf(a.iucn);
        let y = ratings.indexOf(b.iucn);
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
    }

	const url = 'http://localhost:3001/api/v1/routes'
	
	function getTrees() {
		fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			data.sort(sortMethods[sortMethod])
			var listings = data.map(tree => 
				<li key={tree.map_link.slice(-10, -4)}>
					<TreeListing tree_obj={tree} search={false}/>
				</li>
			);
			return <ul className="ml-72">{listings}</ul>
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
			<Navbar cur_page='Browse' />
			<div className="justify-items-center justify-center text-center mt-30 pb-20 bg-green-50">
				<div className='font-serif text-sm text-center mb-3 justify-items-center'>
					<button className='mr-15 sort_button' onClick={() => {
						if(buttonState == 0) { setSortMethod(1); setButtonState(1); getTrees(); }
						else { setSortMethod(0); setButtonState(0); getTrees(); }
						}}> Sort By </button>
					<button className='mx-40 sort_button' onClick={() => {
						if(buttonState == 0) { setSortMethod(3); setButtonState(1); getTrees(); }
						else { setSortMethod(2); setButtonState(0); getTrees(); }
						}}> Sort By </button>
					<button className='ml-15 sort_button' onClick={() => {
						if(buttonState == 0) { setSortMethod(5); setButtonState(1); getTrees(); }
						else { setSortMethod(4); setButtonState(0); getTrees(); }
						}}> Sort By </button>
				</div>
				<div className="grid grid-cols-3 gap-40 font-serif text-md text-center mb-6 m-auto justify-center">
					<b className="translate-x-5"> Common Name </b>
					<b className="pl-5"> Scientific Name </b>
					<b> <a href='https://www.iucnredlist.org/'> IUCN </a> Rating </b>
				</div>
				{trees ? trees : 'There is no tree data available'}
			</div>
		</div>
	);
}
export default Browse;