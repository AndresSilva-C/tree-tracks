import { Link } from "react-router";

function References() {
	// JS here
	
	return (
		<div className="absolute top-0 left-0 w-screen h-screen overflow-hidden bg-cover bg-center
		bg-radial from-green-400 from-30% to-teal-700">
			<div>
				<h1 className="font-bold text-6xl text-start text-black font-serif p-10 tracking-wide">
                    References
                </h1>
				<div className="text-start font-serif text-lg text-balance text-black ml-10">
					<ul className="mt-8 list-inside">
						Maps site with taxon and common names:
						<li>
							Fryer, Janet L., comp. 2018. Tree species distribution maps from Little's "Atlas of United States trees"
							series. In: Fire Effects Information System, [Online]. U.S. Department of Agriculture, Forest Service,
							Rocky Mountain Research Station, Fire Sciences Laboratory (Producer).
							Available: https://www.fs.usda.gov/database/feis/pdfs/Little/aa_SupportingFiles/LittleMaps.html [92602].
						</li>
						<br></br>
						GlobalTreeSearch data by country:
						<li>
							BGCI. 2025. GlobalTreeSearch online database.
							Botanic Gardens Conservation International. Richmond, UK.
							Available at https://tools.bgci.org/global_tree_search.php
							Accessed on (12/20/2025).
						</li>
					</ul>
					<Link to='/' style={{color: "rgba(45, 218, 137, 1)"}} className="absolute right-10 bottom-6">
						Home
					</Link>
					<Link to='/about' style={{color: "rgba(45, 218, 137, 1)"}} className="absolute left-10 bottom-6">
						Back: About
					</Link>
				</div>
			</div>
		</div>
	);
}
export default References;