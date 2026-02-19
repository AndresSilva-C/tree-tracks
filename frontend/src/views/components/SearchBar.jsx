// Reference Credit: https://tomdekan.com/articles/react-search-bar?ref=r-react
import { useState, useEffect, useMemo } from 'react'
import TreeListing from './TreeListing'

function SearchBar({passNotification}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [trees, setTrees] = useState([]);
    const [sortMethod, setSortMethod] = useState(0);
    const [buttonState, setButtonState] = useState(0);

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
            return data;
		})
		.then(data => {
			setTrees(data);
		});
	}

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        }
    }
    
    const handleSearch = useMemo(() =>
        debounce((term) => {
            if (term.trim() === '') {
                setSearchResults([]);
            } else {
                getTrees();
                const results = trees.filter((item) =>
                    item.common_name.toLowerCase().includes(term.toLowerCase()) || 
                    item.taxon.toLowerCase().includes(term.toLowerCase()),
                );
                const sortMethods = [sortCommonNameDesc, sortCommonNameAsc, sortTaxonDesc, sortTaxonAsc, sortIucnDesc, sortIucnAsc];
                setSearchResults(results.sort(sortMethods[sortMethod]));
            }
        }, 300),
        [trees, sortMethod],
    )
    
    useEffect(() => {
        handleSearch(searchTerm)
    }, [searchTerm, handleSearch])
    
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }
    
    return (
        <div className="flex w-1/2 min-h-screen flex-col items-center bg-green-50 p-4">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="mb-8 w-full"
            >
                <div className="relative">
                    <input
                        id="search_input"
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 pr-20 text-base shadow-md transition-shadow duration-200 hover:shadow-lg focus:border-gray-300 focus:outline-none"
                        placeholder="Search by tree's common name or taxon (scientific name)"
                    />
                    <div className="absolute right-0 top-0 mr-4 mt-1 flex items-center">
                        <button type="submit" className="search_button">
                            <img
                                alt="Search"
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Codex_icon_search_color-success.svg"
                                className="h-5 w-auto"
                            />{' '}
                        </button>{' '}
                    </div>{' '}
                </div>{' '}
            </form>{' '}
            {searchResults.length > 0 && (
                <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-md">
                    <h2 className="mb-4 text-xl font-bold"> Search Results: </h2>{' '}
                    <div className='font-serif text-sm text-center mb-2 justify-center'>
                        <button className='mr-15 sort_button' onClick={() => {
                            if(buttonState == 0) { setSortMethod(1); setButtonState(1); handleSearch(searchTerm); }
                            else { setSortMethod(0); setButtonState(0); handleSearch(searchTerm); }
                            }}> Sort By </button>
                        <button className='mx-20 sort_button' onClick={() => {
                            if(buttonState == 0) { setSortMethod(3); setButtonState(1); handleSearch(searchTerm); }
                            else { setSortMethod(2); setButtonState(0); handleSearch(searchTerm); }
                            }}> Sort By </button>
                        <button className='ml-15 sort_button' onClick={() => {
                            if(buttonState == 0) { setSortMethod(5); setButtonState(1); handleSearch(searchTerm); }
                            else { setSortMethod(4); setButtonState(0); handleSearch(searchTerm); }
                            }}> Sort By </button>
                    </div>
                    <div className="grid grid-cols-3 gap-10 font-serif text-md text-center mb-6 m-auto justify-center ml-2">
                        <b> Common Name </b>
                        <b> Scientific Name </b>
                        <b> <a href='https://www.iucnredlist.org/'> IUCN </a> Rating </b>
                    </div>
                    <ul>
                        {' '}
                        {searchResults.map((result) => (
                        <li key={result.map_link.slice(-10, -4)}>
                            <TreeListing tree_obj={result} search={true} passNotification={passNotification} />
                        </li>
                        ))}{' '}
                    </ul>{' '}
                </div>
            )}{' '}
        </div>
    );
}
export default SearchBar;