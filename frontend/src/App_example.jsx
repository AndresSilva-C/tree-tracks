import {useState, useEffect} from 'react'
import './App.css'

function App() {
	const [merchants, setMerchants] = useState(false);
	const url = 'http://localhost:3001'

	function getMerchant() {
		fetch(url)
		.then(response => {
			return response.text();
		})
		.then(data => {
			setMerchants(data);
		});
	}
	
	function createMerchant() {
		let name = prompt('Enter merchant name');
		let email = prompt('Enter merchant email');
		fetch(url + '/merchants', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, email}),
		})
		.then(response => {
			return response.text();
		})
		.then(data => {
			alert(data);
			getMerchant();
		});
	}
	
	function deleteMerchant() {
		let id = prompt('Enter merchant id');
		fetch(url + `/merchants/${id}`, {
			method: 'DELETE',
		})
		.then(response => {
			return response.text();
		})
		.then(data => {
			alert(data);
			getMerchant();
		});
	}
	
	function updateMerchant() {
		let id = prompt('Enter merchant id');
		let name = prompt('Enter new merchant name');
		let email = prompt('Enter new merchant email');
		fetch(url + `/merchants/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({id, name, email}),
		})
		.then(response => {
			return response.text();
		})
		.then(data => {
			alert(data);
			getMerchant();
		});
	}
	
	useEffect(() => {
		getMerchant();
	}, []);
	
	return (
		<div>
		{merchants ? merchants : 'There is no merchant data available'}
		<br />
		<button onClick={createMerchant}>Add merchant</button>
		<br />
		<button onClick={deleteMerchant}>Delete merchant</button>
		<br />
		<button onClick={updateMerchant}>Update merchant</button>
		</div>
	);
}
export default App;