import { Link } from "react-router";
import './Button.css'

function Button({text, route}) {
	// JS here
	
	return (
		<Link to={route}> 
			<div className="text-center rounded-full bg-green-900 text-green-600 w-48 h-12 font-mono text-lg
			font-bold outline-3 outline-green-950 effect">
				<p className="pt-2"> {text} </p>
			</div>
		</Link>
	);
}
export default Button;