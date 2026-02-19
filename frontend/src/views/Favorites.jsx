import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from "react-router";
import Navbar from './components/Navbar';
import TreeListing from './components/TreeListing';

function Favorites() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const [trees, setTrees] = useState([]);
	const [notification, setNotification] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie] = useCookies([]);
	
	const url = 'http://localhost:3001/api/v1/routes'

	function getUserFavorites() {
		if(!cookies['USER']) {
			return;
		}
		fetch(url + "/favorites", {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({username: cookies['USER']['username']})	
			})
		.then(response => {
			return response.json();
		})
		.then(data => {
			setIsLoggedIn(true);
			setFavorites(data[0].favorites);
		});
	}

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

	const favoriteTrees = trees.filter(tree =>
		favorites.includes(tree.map_link.slice(-10, -4))
	);


	useEffect(() => {
		getUserFavorites();
		getTrees();
	}, []);

	const passNotification = (message) => {
		setNotification(message);
	}

	// Timer to control notification messages
	useEffect(() => {
		const timer = setTimeout(() => {
			setNotification('')
		}, 5000);
		return () => {
			clearTimeout(timer);
		}
	}, [notification]);
	
	return (
		<div className="absolute top-0 start-0 w-full h-full bg-green-50 justify-items-center">
			<Navbar />
			<div className="justify-items-center justify-center text-center mt-30 pb-20 bg-green-50">
				{isLoggedIn ? 
				<div>
					<h2 className='text-3xl font-serif font-semibold text-black mb-12 justify-items-center'>
						Welcome {cookies['USER']['username']}! Here are your favorite trees:
					</h2>
					<ul className='w-3/4 pl-20'>
						{favoriteTrees.map(tree => (
							<li key={tree.map_link.slice(-10, -4)}>
								<TreeListing
									tree_obj={tree}
									search={false}
									passNotification={passNotification}
									in_list={true}
									showButton={true}
								/>
							</li>
						))}
					</ul>
				</div> 
				:
				<h2 className='text-3xl font-serif text-black tracking-wide mt-50 justify-items-center'>
					<Link to='/login' style={{color: "rgb(16, 165, 73)"}}>
					 Register or Log In </Link> to save your favorite trees and view them here!
				</h2> 
				}
			</div>
			{notification && <p className='bg-green-200 rounded-md text-black text-2xl fixed bottom-10 text-center p-3'>
								{notification}
							 </p>}
		</div>
	);
}
export default Favorites;