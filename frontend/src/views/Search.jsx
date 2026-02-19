import SearchBar from "./components/Searchbar";
import Navbar from "./components/Navbar";
import { useState } from "react";

function Search() {
	const [notification, setNotification] = useState('');

	const passNotification = (message) => {
		setNotification(message);
	}
	
	return (
		<div className="absolute top-0 start-0 w-full h-full bg-green-50">
            <Navbar cur_page="Search" />
            <div className="justify-items-center mt-25 pb-20 bg-green-50">
                <SearchBar passNotification={passNotification} />
			</div>
			{notification && <p className='bg-green-200 rounded-md text-black text-2xl absolute bottom-10 text-center p-3'>
				 				{notification}
				  			 </p>}
        </div>
	);
}
export default Search;