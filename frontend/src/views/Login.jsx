import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie';
import { Link } from "react-router";
import './components/Button.css'

function Login() {
	const url = 'http://localhost:3001/api/v1/routes'
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [redirect, setRedirect] = useState('');
	const navigate = useNavigate();
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie] = useCookies([]);
	
	function submitLogin(formData) {
		try{
			var username = formData.get("username");
			var password = formData.get("pw")
			fetch(url + "/login", {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({username: username, password: password})	
			})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (!data.success) {
					setSuccessMessage('');
					setErrorMessage(`ERROR: ${data.message}`);
				}
				else {
					setErrorMessage('');
					setSuccessMessage('Logged in successfully! Please wait...');
					// set cookie
					setCookie('USER', {username: data.username, token: data.token});
					setRedirect(true);
				}
			});
		}
		catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.message);
        }
	}

	function submitRegister(formData) {
		try{
			var username = formData.get("username");
			var password = formData.get("pw")
			fetch(url + "/register", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({username: username, password: password})	
			})
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log("data:", data);
				if (!data.success) {
					setSuccessMessage('');
					setErrorMessage(`ERROR: ${data.message}`);
				}
				else {
					setErrorMessage('');
					setSuccessMessage('Account created successfully!');
					// set cookies
					setCookie('USER', {username: data.username, token: data.token});
					setRedirect(true);
				}
			})
		}
		catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.message);
        }
	}

	useEffect(() => {
        if (redirect == true) {
            navigate('/browse');
        }
    }, [redirect, navigate]);

	// Timer to control notification messages
	useEffect(() => {
		const timer = setTimeout(() => {
			setErrorMessage('');
			setSuccessMessage('');
		}, 5000);
		return () => {
			clearTimeout(timer);
		}
	}, [errorMessage, successMessage]);
	
	return (
		<div className="absolute top-0 start-0 w-full h-full bg-green-700 justify-items-center">
			<Link to='/'>
				<img
					alt="TreeTracks"
					src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Fir_Tree_%26_Road.svg?color=green&shade=500"
					className="h-12 w-auto absolute top-5 left-5 bg-green-100 rounded-lg effect"
				/>
			</Link>
			<div className="border-l-4 border-solid border-green-900 h-[60%] absolute left-[50%] -ml-3 top-[20%]"></div>
			<div className="grid grid-cols-2 w-[80%] justify-items-center">
				<div>
					<h1 className="font-bold text-4xl text-center text-lime-200 font-serif tracking-wide mt-30">
						Log In
					</h1>
					<form action={submitLogin} className="mt-20">	
						<label htmlFor="username" className="font-semibold text-lg text-lime-200 font-serif "> Username: </label>
						<input type="text" id="username" name="username" required className="ml-3 mb-8 bg-white"/> <br></br>
						<label htmlFor="pw" className="font-semibold text-lg text-lime-200 font-serif "> Password: </label>
						<input type="password" id="pw" name="pw" required className="ml-3 mb-12 bg-white" /> <br></br>
						<button type="submit" className="sort_button"> Let's go! </button>
					</form>
				</div>
				<div>
					<h1 className="font-bold text-4xl text-center text-lime-200 font-serif tracking-wide mt-30">
						Register
					</h1>
					<form action={submitRegister} className="mt-20">	
						<label htmlFor="username" className="font-semibold text-lg text-lime-200 font-serif "> Username: </label>
						<input type="text" id="username" name="username" required className="ml-3 mb-8 bg-white"/> <br></br>
						<label htmlFor="pw" className="font-semibold text-lg text-lime-200 font-serif "> Password: </label>
						<input type="password" id="pw" name="pw" required className="ml-3 mb-12 bg-white" /> <br></br>
						<button type="submit" className="sort_button"> Create Account </button>
					</form>
				</div>
			</div>
			{errorMessage && <p className='bg-green-200 rounded-md text-red-600 text-2xl absolute bottom-10 text-center p-3'>
				 				{errorMessage}
				  			 </p>}
			{successMessage && <p className='bg-green-200 rounded-md text-black text-2xl absolute bottom-10 text-center p-3'>
				 				{successMessage}
				  			   </p>}
		</div>
	);
}
export default Login;