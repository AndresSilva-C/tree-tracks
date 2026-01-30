import SearchBar from "./components/Searchbar";
import Navbar from "./components/Navbar";

function Search() {
	// JS goes here
	
	return (
		<div className="absolute top-0 start-0 w-full h-full bg-green-50">
            <Navbar cur_page="Search" />
            <div className="justify-items-center mt-25 pb-20 bg-green-50">
                <SearchBar />
			</div>
        </div>
	);
}
export default Search;