import { Link } from "react-router";

function Footer() {
	// JS goes here
	
	return (
		<div className="size-full overflow-hidden">
            <div className="absolute left-0 bottom-0 w-full h-1/6 bg-green-600 overflow-hidden">
                <div className="text-lime-200 font-mono text-lg font-bold grid grid-cols-2 my-10 mx-50">
                    <Link to='/about' className='footer_link'>
                        <p> About </p>
                    </Link>
                    <Link to='/references' className='footer_link'>
                        <p> Data References </p>
                    </Link>
                </div>
		    </div>
        </div>
	);
}
export default Footer;